function createElement(tag, attributes, children) {
  const element = document.createElement(tag);

  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, attributes[key]);
    });
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof HTMLElement) {
        element.appendChild(child);
      }
    });
  } else if (typeof children === "string") {
    element.appendChild(document.createTextNode(children));
  } else if (children instanceof HTMLElement) {
    element.appendChild(children);
  }

  return element;
}

function createElement(tag, attributes, children, callbacks = []) {
  const element = document.createElement(tag);

  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, attributes[key]);
    });
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof HTMLElement) {
        element.appendChild(child);
      }
    });
  } else if (typeof children === "string") {
    element.appendChild(document.createTextNode(children));
  } else if (children instanceof HTMLElement) {
    element.appendChild(children);
  }

  for (let callback of callbacks) {
    element.addEventListener(callback);
  }

  return element;
}

class Component {
  constructor() {
  }

  getDomNode() {
    this._domNode = this.render();
    return this._domNode;
  }
}

class TodoList extends Component {
  constructor(elAttrs) {
    super();
    this.state = [];

    for (let elAttr of elAttrs) {
      this.state.push(Object.assign({}, elAttr));
    }
  }

  onAddTask() {

  }

  onAddInputChange () {

  }

  render() {
    let elementsArr = [];
    let todosArr = [];

    elementsArr.push(createElement("h1", {}, "TODO List"),
        createElement("div", { class: "add-todo" }, [
          createElement("input", {
            id: "new-todo",
            type: "text",
            placeholder: "Задание",
          }),
          createElement("button", { id: "add-btn" }, "+"),
        ])
    );

    for (let attr of this.state) {
      todosArr.push(createElement("ul", {}, createElement("li", {}, [
        createElement("input", { type: attr.type }),
        createElement("label", {}, attr.label),
        createElement("button", {}, attr.button)
      ])));
    }

    elementsArr.push(createElement("ul", { id: "todos" }, todosArr));

    return createElement("div", { class: "todo-list" }, elementsArr);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let elements = [
      {
        type: "checkbox", label: "Сделать домашку", button: "🗑️"
      },
      {
        type: "checkbox", label: "Сделать практику", button: "🗑️"
      },
      {
        type: "checkbox", label: "Пойти домой", button: "🗑️"
      }
  ]
  document.body.appendChild(new TodoList(elements).getDomNode());
});

createElement("div", { class: "todo-list" }, [
  createElement("h1", {}, "TODO List"),
  createElement("div", { class: "add-todo" }, [
    createElement("input", {
      id: "new-todo",
      type: "text",
      placeholder: "Задание",
    }),
    createElement("button", { id: "add-btn" }, "+"),
  ]),

  createElement("ul", { id: "todos" }, [
    createElement("li", {}, [
      createElement("input", { type: "checkbox" }),
      createElement("label", {}, "Сделать домашку"),
      createElement("button", {}, "🗑️")
    ]),
    createElement("li", {}, [
      createElement("input", { type: "checkbox" }),
      createElement("label", {}, "Сделать практику"),
      createElement("button", {}, "🗑️")
    ]),
    createElement("li", {}, [
      createElement("input", { type: "checkbox" }),
      createElement("label", {}, "Пойти домой"),
      createElement("button", {}, "🗑️")
    ]),
  ]),
])