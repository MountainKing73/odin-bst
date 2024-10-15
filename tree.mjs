import { Node } from "./node.mjs";

function compareNumbers(a, b) {
  return a - b;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  #buildTreeRecu(array, start, end) {
    if (start > end) {
      return null;
    }

    let mid = start + Math.floor((end - start) / 2);

    let root = new Node(array[mid]);

    root.left = this.#buildTreeRecu(array, start, mid - 1);
    root.right = this.#buildTreeRecu(array, mid + 1, end);
    return root;
  }

  buildTree(array) {
    array.sort(compareNumbers);

    console.log("Array: " + array);

    array = [...new Set(array)];

    return this.#buildTreeRecu(array, 0, array.length - 1);
  }

  #insertRecur(node, value) {
    if (node === null) {
      return new Node(value);
    }

    // Don't insert duplicate values
    if (value === node.data) {
      return node;
    }

    if (value < node.data) {
      node.left = this.#insertRecur(node.left, value);
    }

    if (value > node.data) {
      node.right = this.#insertRecur(node.right, value);
    }

    return node;
  }

  insert(value) {
    let currNode = this.root;

    this.#insertRecur(currNode, value);
  }
}

export { Tree, prettyPrint };
