export const isModel = (model) => {
  if (model == null) return false;
  return Array.isArray(model);
}

export const exportModel = async (model) => {
  const filename = "model.json";
  const json = JSON.stringify(model);
  const blob = new Blob([json], { type: "application/json" });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}