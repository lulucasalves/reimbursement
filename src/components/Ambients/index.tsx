import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { BiCheck, BiPencil } from "react-icons/bi";
import { useStatus } from "~/src/contexts/state";
import { useRouter } from "next/navigation";
import { useAuth } from "~/src/contexts/auth";
import api from "~/src/services/api";

interface Ambient {
  name: string;
  id: string;
}

interface AmbientNameEdit extends Ambient {
  originalName: string;
  isEditing: boolean;
  created_at: string;
  loading: boolean;
}

export function ComponentAmbients() {
  const { t, currentLanguage } = useStatus();
  const { userData, changeUserData, setAmbient } = useAuth();
  const router = useRouter();

  const [ambientList, setAmbientList] = useState<AmbientNameEdit[]>([]);
  const [editValue, setEditValue] = useState<string>("");

  function goToDashboard() {
    router.push(`/${currentLanguage}/dashboard`);
  }

  useEffect(() => {
    const ambients = userData?.ambients || [];

    setAmbientList(
      ambients.map((val) => ({
        ...val,
        id: val.ambient_id,
        originalName: val.name,
        isEditing: false,
        loading: false,
      }))
    );
  }, [currentLanguage, router, userData]);

  function enterAmbient(id) {
    setAmbient(id);
    goToDashboard();
  }

  const handleEditToggle = async (id: string) => {
    setAmbientList((prevList) =>
      prevList.map((item) => {
        if (item.id === id) {
          if (item.isEditing) {
            const newName = editValue || item.name;

            return {
              ...item,
              isEditing: false,
              name: newName,
              loading: true,
            };
          }
          setEditValue(item.name);
          return { ...item, isEditing: !item.isEditing };
        }
        return item;
      })
    );

    if (editValue) {
      setEditValue("");

      try {
        const response = await api.post("/ambient/update", {
          name: editValue,
          ambientId: id,
        });

        if (response.data.success) {
          changeUserData({
            ...userData,
            ambients: ambientList.map((val) => ({
              ...val,
              ambient_id: val.id,
              name: val.id === id ? editValue : val.name,
            })),
          });
        }
      } finally {
        setAmbientList((prevList) =>
          prevList.map((item) =>
            item.id === id ? { ...item, loading: false } : item
          )
        );
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  function formatDate(date) {
    const newDate = new Date(date);
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();

    return `${month}/${year}`;
  }

  return (
    <div className="ambient-container">
      <h3>{t("select_ambient")}</h3>
      <div className="ambient-content">
        {ambientList.map((ambient) => (
          <div key={ambient.id} className="ambient-item">
            <div className="input-edit">
              <Input
                name={ambient.id}
                sx={{ fontSize: "1.2rem" }}
                value={ambient.isEditing ? editValue : ambient.name}
                onChange={handleInputChange}
                disabled={!ambient.isEditing}
              />
              <Button
                variant="outlined"
                onClick={() => handleEditToggle(ambient.id)}
                loadingPosition="start"
                color="primary"
                disabled={ambient.loading}
                startIcon={ambient.isEditing ? <BiCheck /> : <BiPencil />}
                sx={{
                  fontSize: "0.8rem",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  minWidth: "auto",
                }}
              />
            </div>
            <p className="ambient-description">
              {t("created_at")} {formatDate(ambient.created_at)}
            </p>
            <Button
              variant="outlined"
              onClick={() => enterAmbient(ambient.id)}
              loadingPosition="start"
              color="primary"
              sx={{
                fontSize: "0.8rem",
              }}
            >
              {t("enter")}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
