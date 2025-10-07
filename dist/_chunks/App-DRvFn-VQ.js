"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const designSystem = require("@strapi/design-system");
const reactIntl = require("react-intl");
const index = require("./index-Y7rxqEbo.js");
const react = require("react");
const getTranslation = (id) => `${index.PLUGIN_ID}.${id}`;
const HomePage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { get, post } = admin.useFetchClient();
  const [collectionTypes, setCollectionTypes] = react.useState([]);
  const [exportCollections, setExportCollections] = react.useState([]);
  const [importCollections, setImportCollections] = react.useState([]);
  const [isSaving, setIsSaving] = react.useState(false);
  const [isModalOpen, setIsModalOpen] = react.useState(false);
  const [modalMessage, setModalMessage] = react.useState("");
  const [modalTitle, setModalTitle] = react.useState("");
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
  react.useEffect(() => {
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
  react.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { padding: 8, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "beta", as: "h1", children: [
        formatMessage({ id: getTranslation("welcome.message"), defaultMessage: "Welcome to" }),
        " ",
        formatMessage({ id: getTranslation("plugin.name"), defaultMessage: "Xlsx Import/Export Plugin" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", as: "p", children: formatMessage({
        id: getTranslation("welcome.description"),
        defaultMessage: "Configure the display of the Export or Import button using the desired Collection through the options below"
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 4, paddingBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {}) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 8, alignItems: "flex-start", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { width: "50%", padding: 4, borderColor: { initial: "#eaeaef" }, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", as: "h2", children: formatMessage({ id: getTranslation("config.export-collections"), defaultMessage: "Export Collections" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, marginTop: 2, alignItems: "left", children: [
          formatMessage({
            id: getTranslation("config.export-collections-description"),
            defaultMessage: "Choose collections to enable export"
          }),
          collectionTypes.map((ct) => /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Checkbox,
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
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { width: "50%", padding: 4, borderColor: { initial: "#eaeaef" }, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", as: "h2", children: formatMessage({ id: getTranslation("config.import-collections"), defaultMessage: "Import Collections" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, marginTop: 2, alignItems: "left", children: [
          formatMessage({
            id: getTranslation("config.import-collections-description"),
            defaultMessage: "Choose collections to enable import"
          }),
          collectionTypes.map((ct) => /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Checkbox,
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
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { marginTop: 4, justifyContent: "center", alignItems: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleSave, disabled: isSaving, children: isSaving ? "Saving..." : "Save Config" }) }),
    isModalOpen && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: isModalOpen, onOpenChange: closeModal, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: modalTitle }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Root, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: modalMessage }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Footer, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", children: "Close" }) }) })
    ] }) })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(HomePage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "*", element: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) })
  ] });
};
exports.App = App;
