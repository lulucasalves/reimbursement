import { useEffect } from "react";
import { InterfaceHead } from "./interfaces";
import { useStatus } from "~/src/contexts/state";

export function ComponentHead({ title, description, content }: InterfaceHead) {
  const { t } = useStatus();

  useEffect(() => {
    document.title = `${t("site_name")} | ${t(title)}`;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", t(description));
      metaDescription.setAttribute("content", t(content));
      document.head.appendChild(metaDescription);
    }
  }, [title, description, content, t]);

  return <></>;
}
