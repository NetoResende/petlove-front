import produto from "../assets/produto.png";
const UltimasColetas = () => {
    return ( 
        <div>
            <h6 className="text-roxo text-lg mb-3 font-semibold">Últimas coletas</h6>
            <div className=" bg-white rounded flex items-center shadow-lg p-2 ">
                <img src={produto} alt="Produto"/>
                <div className="flex-1 leading-4">
                    <h5 className="text-lg">
                        Nome do Produto
                    </h5>
                    <h6 className="text-xs">
                        Preço base: R$ 00,00                    
                    </h6>
                    <h6 className="text-xs">
                        Preço coletado: R$ 00,00                    
                    </h6>
                </div>
                <span className="text-green-500 font-bold">+8%</span>
            </div>
        </div>
     );
}
 
export default UltimasColetas;