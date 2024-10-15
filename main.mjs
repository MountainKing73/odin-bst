import { Tree, prettyPrint } from "./tree.mjs";

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let bst = new Tree(array);

prettyPrint(bst.root);

bst.insert(24);
bst.insert(3);
bst.insert(2);

prettyPrint(bst.root);
