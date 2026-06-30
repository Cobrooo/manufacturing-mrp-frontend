import Tree from 'react-d3-tree';
import { useCallback } from 'react';

// Transforms your BomExplosionResult array into react-d3-tree's expected format
function buildTreeData(productName, targetQuantity, results) {
  return {
    name: `${productName} (x${targetQuantity})`,
    attributes: { type: 'FINISHED_GOOD' },
    children: results.map((item) => ({
      name: item.itemName,
      attributes: {
        type: item.itemType,
        gross: item.grossRequirement,
        onHand: item.onHandQuantity,
        net: item.netRequirement,
      },
    })),
  };
}

function BomTreeView({ productName, targetQuantity, results }) {
  const treeData = buildTreeData(productName, targetQuantity, results);

  const renderCustomNode = useCallback(({ nodeDatum }) => {
    const isRoot = !nodeDatum.attributes?.net;
    const isShortage = nodeDatum.attributes?.net > 0;

    return (
      <g>
        <circle
          r={15}
          fill={isRoot ? '#2563eb' : isShortage ? '#dc2626' : '#16a34a'}
        />
        <text fill="black" x={20} y={-10} style={{ fontSize: '13px', fontWeight: 'bold' }}>
          {nodeDatum.name}
        </text>
        {!isRoot && (
          <text fill="#555" x={20} y={8} style={{ fontSize: '11px' }}>
            Net: {nodeDatum.attributes.net}
          </text>
        )}
      </g>
    );
  }, []);

  if (!results || results.length === 0) {
    return <p>No BOM data to display yet. Submit a production order above.</p>;
  }

  return (
    <div style={{ width: '100%', height: '500px', background: '#fff', borderRadius: '8px' }}>
      <Tree
        data={treeData}
        orientation="vertical"
        renderCustomNodeElement={renderCustomNode}
        translate={{ x: 400, y: 80 }}
        pathFunc="step"
        separation={{ siblings: 1.5, nonSiblings: 2 }}
      />
    </div>
  );
}

export default BomTreeView;