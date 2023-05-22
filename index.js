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

  for (let callbackParams of callbacks) {
    element.addEventListener(callbackParams.event, e => callbackParams.action(callbackParams.todolist));
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

  update() {
    this._domNode = this.render();
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

  onAddTask(todolist) {
    todolist.update();
  }

  onAddInputChange (todolist) {
    todolist.state.push({
      type: "checkbox", label: this.value, button: "🗑️"
    });
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
          }, null, [{ event: 'change', action: this.onAddInputChange, todolist: this }]),
          createElement("button", { id: "add-btn" }, "+", [{ event: 'click', action: this.onAddTask, todolist: this }]),
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
