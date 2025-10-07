import { jsxs, jsx } from "react/jsx-runtime";
import { useFetchClient, Page } from "@strapi/strapi/admin";
import { Routes, Route } from "react-router-dom";
import { Main, Box, Typography, Divider, Flex, Checkbox, Button, Modal, Field } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { P as PLUGIN_ID } from "./index-DOyNKAoP.mjs";
import { useState, useEffect } from "react";
const getTranslation = (id) => `${PLUGIN_ID}.${id}`;
const HomePage = () => {
  const { formatMessage } = useIntl();
  const { get, post } = useFetchClient();
  const [collectionTypes, setCollectionTypes] = useState([]);
  const [exportCollections, setExportCollections] = useState([]);
  const [importCollections, setImportCollections] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const showModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
    setModalTitle("");
  };
  useEffect(() => {
    const fetchCollectionTypes = async () => {
      try {
        const response = await get("/content-type-builder/content-types");
        let collections = [];
        if (Array.isArray(response.data)) {
          collections = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          collections = response.data.data;
        }
        const filtered = collections.filter(
          (ct) => ct.schema && ct.schema.kind === "collectionType" && ct.schema.visible
        );
        setCollectionTypes(filtered);
      } catch (error) {
        console.error("Failed to fetch collection types", error);
        showModal("Error", "Failed to load collection types");
      }
    };
    fetchCollectionTypes();
  }, [get]);
  useEffect(() => {
    const fetchSavedConfig = async () => {
      try {
        const response = await get("/strapi-xlsx-impexp-plugin/config");
        let config;
        if (Array.isArray(response.data)) {
          config = response.data[0];
        } else {
          config = response.data;
        }
        if (config) {
          setExportCollections(config.selectedExportCollections || []);
          setImportCollections(config.selectedImportCollections || []);
        }
      } catch (error) {
        console.error("Error fetching saved config:", error);
      }
    };
    fetchSavedConfig();
  }, [get]);
  const handleExportToggle = (uid) => {
    if (exportCollections.includes(uid)) {
      setExportCollections(exportCollections.filter((v) => v !== uid));
    } else {
      setExportCollections([...exportCollections, uid]);
    }
  };
  const handleImportToggle = (uid) => {
    if (importCollections.includes(uid)) {
      setImportCollections(importCollections.filter((v) => v !== uid));
    } else {
      setImportCollections([...importCollections, uid]);
    }
  };
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await post("/strapi-xlsx-impexp-plugin/config", {
        data: {
          selectedExportCollections: exportCollections,
          selectedImportCollections: importCollections
        }
      });
      console.log("Config saved:", response.data);
      showModal("Success", "Configuration saved successfully!");
    } catch (error) {
      console.error("Error saving config:", error);
      showModal("Error", "Error saving configuration.");
    } finally {
      setIsSaving(false);
    }
  };
  return /* @__PURE__ */ jsxs(Main, { padding: 8, children: [
    /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsxs(Typography, { variant: "beta", as: "h1", children: [
        formatMessage({ id: getTranslation("welcome.message"), defaultMessage: "Welcome to" }),
        " ",
        formatMessage({ id: getTranslation("plugin.name"), defaultMessage: "Xlsx Import/Export Plugin" })
      ] }),
      /* @__PURE__ */ jsx(Typography, { variant: "omega", as: "p", children: formatMessage({
        id: getTranslation("welcome.description"),
        defaultMessage: "Configure the display of the Export or Import button using the desired Collection through the options below"
      }) })
    ] }),
    /* @__PURE__ */ jsx(Box, { paddingTop: 4, paddingBottom: 4, children: /* @__PURE__ */ jsx(Divider, {}) }),
    /* @__PURE__ */ jsxs(Flex, { gap: 8, alignItems: "flex-start", children: [
      /* @__PURE__ */ jsxs(Box, { width: "50%", padding: 4, borderColor: { initial: "#eaeaef" }, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: formatMessage({ id: getTranslation("config.export-collections"), defaultMessage: "Export Collections" }) }),
        /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, marginTop: 2, alignItems: "left", children: [
          formatMessage({
            id: getTranslation("config.export-collections-description"),
            defaultMessage: "Choose collections to enable export"
          }),
          collectionTypes.map((ct) => /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: exportCollections.includes(ct.uid),
              onCheckedChange: () => handleExportToggle(ct.uid),
              disabled: isSaving,
              children: ct.schema.displayName
            },
            ct.uid
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Box, { width: "50%", padding: 4, borderColor: { initial: "#eaeaef" }, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", children: formatMessage({ id: getTranslation("config.import-collections"), defaultMessage: "Import Collections" }) }),
        /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, marginTop: 2, alignItems: "left", children: [
          formatMessage({
            id: getTranslation("config.import-collections-description"),
            defaultMessage: "Choose collections to enable import"
          }),
          collectionTypes.map((ct) => /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: importCollections.includes(ct.uid),
              onCheckedChange: () => handleImportToggle(ct.uid),
              disabled: isSaving,
              children: ct.schema.displayName
            },
            ct.uid
          ))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Flex, { marginTop: 4, justifyContent: "center", alignItems: "center", children: /* @__PURE__ */ jsx(Button, { onClick: handleSave, disabled: isSaving, children: isSaving ? "Saving..." : "Save Config" }) }),
    isModalOpen && /* @__PURE__ */ jsx(Modal.Root, { open: isModalOpen, onOpenChange: closeModal, children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
      /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: modalTitle }) }),
      /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsx(Field.Root, { children: /* @__PURE__ */ jsx(Field.Label, { children: modalMessage }) }) }),
      /* @__PURE__ */ jsx(Modal.Footer, { children: /* @__PURE__ */ jsx(Modal.Close, { children: /* @__PURE__ */ jsx(Button, { variant: "tertiary", children: "Close" }) }) })
    ] }) })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Page.Error, {}) })
  ] });
};
export {
  App
};
