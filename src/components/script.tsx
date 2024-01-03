const ScriptTag = () => {
  function setUserColorMode() {
    function getUserColorMode() {
      const userPreference = window.localStorage.getItem("theme");

      if (typeof userPreference === "string") {
        return userPreference;
      }

      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDarkMode ? "dark" : "light";
    }

    const colorMode = getUserColorMode();
    document.body.className = colorMode;
  }

  const fnToRunOnClient = `(${setUserColorMode})()`;

  return <script dangerouslySetInnerHTML={{ __html: fnToRunOnClient }} />;
};

export default ScriptTag;
