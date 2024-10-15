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
}

export { Tree, prettyPrint };
