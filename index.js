const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function countDistinct(array){
	let quant = []
	array.forEach(element => {
		if(!quant.includes(element.category)) quant.push(element.category)
	});
	return quant.length
}

function filtrarProdutos(ids, productsList){
	return productsList.filter(prod => ids.includes(prod.id))
}

function mapearProdutos(produtos){
	return produtos.map(prods => {return {name: prods.name, category: prods.category}})
}

function calcularPrecoCheio(produtos){
	return produtos.reduce((total, item) => {
		return total += item.regularPrice
	}, 0)
}

function calcularPrecoPromocao(produtos){
	let promocao = promotions[countDistinct(produtos) - 1]
	return produtos.reduce((total, item) => {
		const index = item.promotions.findIndex((promo, index, array) => 
					  promo.looks.some((index2) => index2 === promocao));
		return (index >= 0) ? total += item.promotions[index].price : total += item.regularPrice
	}, 0)
}

function getShoppingCart(ids, productsList) {
	let produtos = filtrarProdutos(ids, productsList)	
	let precoCheio = calcularPrecoCheio(produtos)	
	let promocao = promotions[countDistinct(produtos) - 1]
	let precoTotal = calcularPrecoPromocao(produtos)

	return {
		products:mapearProdutos(produtos),
		promotion: promocao,
		totalPrice: precoTotal.toFixed(2),
		discountValue: (precoCheio - precoTotal).toFixed(2),
		discount: (((precoCheio - precoTotal) / precoCheio) * 100).toFixed(2)+"%"
	};
}

module.exports = { getShoppingCart };
