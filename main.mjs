import { Tree, prettyPrint } from "./tree.mjs";

let array = Array(100)
  .fill()
  .map(() => Math.round(Math.random() * 100));

let bst = new Tree(array);

//prettyPrint(bst.root);
console.log("Is balanced: " + bst.isBalanced());

function printData(node) {
  process.stdout.write(`${node.data} `);
}

console.log("Level Order");
bst.levelOrder(printData);
console.log("");
console.log("In Order");
bst.inOrder(printData);
console.log("");
console.log("Pre Order");
bst.preOrder(printData);
console.log("");
console.log("Post Order");
bst.postOrder(printData);
console.log("");

bst.insert(348);
bst.insert(849);
bst.insert(1038);
bst.insert(103);
console.log("Is balanced: " + bst.isBalanced());
bst.rebalance();
console.log("Is balanced: " + bst.isBalanced());

console.log("Level Order");
bst.levelOrder(printData);
console.log("");
console.log("In Order");
bst.inOrder(printData);
console.log("");
console.log("Pre Order");
bst.preOrder(printData);
console.log("");
console.log("Post Order");
bst.postOrder(printData);
console.log("");
