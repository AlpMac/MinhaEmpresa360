import React, { useState } from 'react';

const ProdutoForm = () => {
    const [produtos, setProdutos] = useState([{ produto: '', quantidade: '', unidade: '' }]);
    const [unidades, setUnidades] = useState({ produto1: 'ML', produto2: 'Grama', produto3: 'UN', produto4: 'MG', produto5: 'L' });

    const handleAddProduto = () => {
        setProdutos([...produtos, { produto: '', quantidade: '', unidade: '' }]);
    };

    const handleRemoveProduto = index => {
        const novosProdutos = [...produtos];
        novosProdutos.splice(index, 1);
        setProdutos(novosProdutos);
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const novosProdutos = [...produtos];
        novosProdutos[index][name] = value;
        novosProdutos[index].unidade = unidades[value];
        setProdutos(novosProdutos);
    };

    return (
        <form className="container mt-4">
            {produtos.map((produto, index) => (
                <div key={index} className="row mb-3 border">
                    <div className="col">
                        <div className="d-flex align-items-center">
                            <label htmlFor={`produto-${index}`} className="form-label me-3 align-self-center">Produto usado:</label>
                            <select
                                className="form-select"
                                name={`produto-${index}`}
                                onChange={e => handleChange(index, e)}
                                value={produto.produto}
                            >
                                <option value="">Selecione um produto</option>
                                <option value="produto1">Produto 1</option>
                                <option value="produto2">Produto 2</option>
                                <option value="produto3">Produto 3</option>
                                <option value="produto4">Produto 4</option>
                                <option value="produto5">Produto 5</option>
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="d-flex align-items-center">
                            <label htmlFor={`quantidade-${index}`} className="form-label me-3">Quantidade:</label>
                            <input
                                type="text"
                                className="form-control"
                                name={`quantidade-${index}`}
                                style={{ width: '25%' }} // Defina o tamanho aqui
                                value={produto.quantidade}
                                onChange={e => handleChange(index, e)}
                            />
                            <label className="form-label ms-2">{produto.unidade}</label>
                        </div>
                        {index > 0 && (
                            <div className="row">
                                <div className="col d-flex align-items-center">
                                    <button type="button" className="btn btn-danger mt-4 w-100" onClick={() => handleRemoveProduto(index)}>
                                        Remover
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <button type="button" className="btn btn-primary mb-4 w-100" onClick={handleAddProduto}>Adicionar Produto</button>
        </form>
    );
};

export default ProdutoForm;
