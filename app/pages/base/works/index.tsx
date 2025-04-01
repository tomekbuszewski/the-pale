import { useOutlet } from "react-router";

export function loader() {
  console.log("loader");
  return null;
}

export default function Works() {
  return useOutlet();
}
