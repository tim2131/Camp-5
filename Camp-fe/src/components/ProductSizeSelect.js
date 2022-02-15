import '../style/ProductSizeSelect.scss';

function ProductSizeSelect() {
  return (
    <>
      <div>
        <select className="product-size-select">
          <option value="0">尺寸</option>
          <option value="1">大</option>
          <option value="2">中</option>
          <option value="3">小</option>
        </select>
      </div>
    </>
  );
}

export default ProductSizeSelect;
