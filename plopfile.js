import "./utils/create-ui.js";
import slugify from "slugify";

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function plop(/** @type {import("plop").NodePlopAPI} */ plop) {
  plop.setHelper("slugify", (text) =>
    slugify(`${getCurrentDate()}-${text}`, { lower: true })
  );

  plop.setHelper("currentDate", getCurrentDate);

  plop.setGenerator("ui", {
    description: "Create a new UI component",
    prompts: [
      {
        type: "list",
        name: "type",
        message: "Component type",
        choices: ["atom", "molecule", "organism"],
      },
      {
        type: "input",
        name: "name",
        message: "Component name",
      },
    ],

    actions: [
      {
        type: "add",
        path: "./app/ui/{{type}}s/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "./config/plop-templates/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "./app/ui/{{type}}s/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: "./config/plop-templates/Story.tsx.hbs",
      },
      {
        type: "add",
        path: "./app/ui/{{type}}s/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: "./config/plop-templates/Test.tsx.hbs",
      },
      {
        type: "append",
        path: "./app/ui/{{type}}s/index.ts",
        template:
          'export { default as {{pascalCase name}} } from "./{{pascalCase name}}/{{pascalCase name}}";',
      },
    ],
  });

  plop.setGenerator("feature", {
    description: "Create a new feature",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Feature name",
      },
    ],

    actions: [
      {
        type: "add",
        path: "./app/features/{{pascalCase name}}/{{pascalCase name}}.tsx",
        template:
          "export default function {{pascalCase name}}() {return <div>{{pascalCase name}}</div>}",
      },
      {
        type: "add",
        path: "./app/features/{{pascalCase name}}/index.ts",
        template:
          'export { default as {{pascalCase name}} } from "./{{pascalCase name}}";',
      },
      {
        type: "append",
        path: "./app/features/index.ts",
        template:
          'import * as {{pascalCase name}}Feature from "./{{pascalCase name}}";',
      },
    ],
  });

  plop.setGenerator("hook", {
    description: "Create a new hook",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Hook name",
      },
    ],

    actions: [
      {
        type: "add",
        path: "./app/hooks/{{camelCase name}}/{{camelCase name}}.ts",
        template: "export default function {{camelCase name}}() {}",
      },
      {
        type: "add",
        path: "./app/hooks/{{camelCase name}}/{{camelCase name}}.test.tsx",
        templateFile: "./config/plop-templates/Hook.test.tsx.hbs",
      },
      {
        type: "append",
        path: "./app/hooks/index.ts",
        template:
          'export { default as {{camelCase name}} } from "./{{camelCase name}}/{{camelCase name}}";\n',
      },
    ],
  });

  plop.setGenerator("blogpost", {
    description: "Create a new blog post",
    prompts: [
      {
        type: "input",
        name: "title",
        message: "Blog post title",
      },
      {
        type: "input",
        name: "summary",
        message: "Blog post summary",
      },
      {
        type: "input",
        name: "tags",
        message: "Blog post tags",
      },
      {
        type: "input",
        name: "youtube",
        message: "Blog post youtube video",
      },
      {
        type: "input",
        name: "body",
        message: "Blog post content",
      },
    ],

    actions: [
      {
        type: "add",
        path: `./app/features/Blog/content/${getCurrentDate()} - {{title}}/index.md`,
        templateFile: "./config/plop-templates/BlogPost.md.hbs",
      },
    ],
  });
}
