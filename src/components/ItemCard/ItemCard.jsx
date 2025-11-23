import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <div className="card">      
    <div className="item-name">{item.name}</div>
      <img src={item.link} alt={item.name} />      
    </div>
  );
}
export default ItemCard;
