import { createContext } from "react";

const context = createContext<string | undefined>(undefined);
context.displayName = "LanguageContext";

export default context;
