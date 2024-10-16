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
    this.array = array;
    this.root = this.buildTree(array);
  }

  #buildTreeRecu(array, start, end) {
    if (start > end) {
      return null;
    }

    let mid = start + Math.ceil((end - start) / 2);

    let root = new Node(array[mid]);

    root.left = this.#buildTreeRecu(array, start, mid - 1);
    root.right = this.#buildTreeRecu(array, mid + 1, end);

    return root;
  }

  buildTree(array) {
    array.sort(compareNumbers);

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

  #getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  deleteItem(value, curr = this.root) {
    if (curr === null) {
      return curr;
    }

    if (value < curr.data) {
      curr.left = this.deleteItem(value, curr.left);
    } else if (value > curr.data) {
      curr.right = this.deleteItem(value, curr.right);
    } else {
      if (curr.left === null) {
        return curr.right;
      } else if (curr.right === null) {
        return curr.left;
      } else {
        let succ = this.#getSuccessor(curr);
        curr.data = succ.data;
        curr.right = this.deleteItem(succ.data, curr.right);
      }
    }
    return curr;
  }

  find(value, curr = this.root) {
    if (curr === null) {
      return curr;
    }

    if (value < curr.data) {
      return this.find(value, curr.left);
    } else if (value > curr.data) {
      return this.find(value, curr.right);
    } else {
      return curr;
    }
  }

  levelOrder(callback) {
    if (this.root === null) {
      return;
    }

    let queue = [];

    queue.push(this.root);

    while (queue.length > 0) {
      let node = queue.shift();

      callback(node);

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  inOrder(callback, curr = this.root) {
    if (callback === undefined) {
      throw new Error("Callback is not defined");
    }

    if (curr === null) {
      return;
    }

    this.inOrder(callback, curr.left);
    callback(curr);
    this.inOrder(callback, curr.right);
  }

  preOrder(callback, curr = this.root) {
    if (callback === undefined) {
      throw new Error("Callback is not defined");
    }

    if (curr === null) {
      return;
    }

    callback(curr);
    this.inOrder(callback, curr.left);
    this.inOrder(callback, curr.right);
  }

  postOrder(callback, curr = this.root) {
    if (callback === undefined) {
      throw new Error("Callback is not defined");
    }

    if (curr === null) {
      return;
    }

    this.inOrder(callback, curr.left);
    this.inOrder(callback, curr.right);
    callback(curr);
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(node, curr = this.root, depth = -1) {
    if (node === null || curr === null) {
      return -1;
    }

    if (node.data === curr.data) {
      return depth + 1;
    } else {
      let leftDepth = this.depth(node, curr.left, depth + 1);
      let rightDepth = this.depth(node, curr.right, depth + 1);

      return Math.max(leftDepth, rightDepth);
    }
  }

  isBalanced(curr = this.root) {
    if (curr === null) {
      return true;
    }

    let leftHeight = this.height(curr.left);
    let rightHeight = this.height(curr.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(curr.left) &&
      this.isBalanced(curr.right)
    ) {
      return true;
    }

    return false;
  }

  rebalance() {
    this.array = new Array();
    this.inOrder((node) => {
      this.array.push(node.data);
    });

    this.root = this.buildTree(this.array);
  }
}

export { Tree, prettyPrint };
