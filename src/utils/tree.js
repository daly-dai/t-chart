/**
 * @description 将树平铺为数组
 * @param { object } tree 数据
 * @param { String } children 树形结构关联的属性
 */
export const getTreeMap = (tree, children = 'children') => {
  if (!(tree instanceof Array)) return;

  const treeMap = [];

  tree.forEach(node => {
    treeMap.push(...getNodeMap(node, tree, children));
  });

  return treeMap;
};

const getNodeMap = (node, parentNode, children) => {
  //   node.parentNode = JSON.parse(JSON.stringify(parentNode));
  const nodeMap = [node];

  if (node[children] && node[children].length) {
    node[children].forEach(item =>
      nodeMap.push(...getNodeMap(item, node, children))
    );
  }

  return nodeMap;
};
