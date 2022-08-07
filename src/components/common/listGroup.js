import React from "react";

const ListGroup = ({
	items,
	valueProperty,
	textProperty,
	selectedItem,
	onItemSelect,
}) => {
	return (
		<ul className="list-group">
			{items.map((item) => (
				<li
					onClick={() => onItemSelect(item)}
					key={item[valueProperty]}
					className={
						item === selectedItem
							? "list-group-item active"
							: "list-group-item "
					}
					style={{ cursor: "pointer" }}
				>
					{item[textProperty]}
				</li>
			))}
			{/* <li className="list-group-item">An item</li>
			<li className="list-group-item">A second item</li>
			<li className="list-group-item">A third item</li>
			<li className="list-group-item">A fourth item</li>
			<li className="list-group-item">And a fifth one</li> */}
		</ul>
	);
};

ListGroup.defaultProps = {
	textProperty: "name",
	valueProperty: "_id",
};

export default ListGroup;
