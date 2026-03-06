import { Button, Drawer, Form, Image, Input, Popconfirm, Select, Table, Tag, Upload } from "antd";
import { useContext, useState } from "react";
import { useBuscarMissoes, useCriarMissoes, useDeletarMissoes, useEditarMissoes } from "../../hooks/MissoesHooks";
import { AuthContext } from "../../contexts/AuthProvider";
import { LuPencil, LuPlus, LuTrash2, LuUpload } from "react-icons/lu";
import img from "../../assets/img-error.webp";
import { useBuscarConcorrente } from "../../hooks/ConcorrentesHooks";
import { useBuscarUsuario } from "../../hooks/UsuarioHooks";
import * as XLSX from 'xlsx';

const Missoes = () => {

    const [gavetaCriar, setGavetaCriar] = useState(false);
    const [gavetaEditar, setGavetaEditar] = useState(false);
    const { api } = useContext(AuthContext);
    const { data: missoes = [] } = useBuscarMissoes();
    const { data: concorrentes = [] } = useBuscarConcorrente();
    const { data: usuarios = [] } = useBuscarUsuario();
    const { mutate: criarMissoes, isPending: criarPending } = useCriarMissoes();
    const { mutate: editarMissoes, isPending: editarPending } = useEditarMissoes();
    const { mutate: deletarMissoes, isPending: deletarPending } = useDeletarMissoes();
    const colunasEsperadas = ['codigo', 'nome', 'preco'];

    const [formEditar] = Form.useForm();

    function criar(dados) {
        criarMissoes(dados, {
            onSuccess: (response) => {
                api[response.type]({
                    description: response.description,
                    onClose: () => {
                        setGavetaCriar(false);
                    }
                })
            },
            onError: ({ type, description }) => {
                api[type]({
                    description
                })
            }
        })
        console.log(dados);
        
    }

    function editar(dados) {
        editarMissoes(dados, {
            onSuccess: (response) => {
                api[response.type]({
                    description: response.description,
                    onClose: () => {
                        setGavetaEditar(false);
                    }
                })
            },
            onError: ({ type, description }) => {
                api[type]({
                    description
                })
            }
        })
    }

    function deletar(id) {
        deletarMissoes(id, {
            onSuccess: (response) => {
                api[response.type]({
                    description: response.description
                })
            },
            onError: ({ type, description }) => {
                api[type]({
                    description
                })
            }
        })
    }
    const validarArquivo = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                const rows = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                    defval: '',
                    blankrows: false
                });

                if (!rows.length) {
                    return reject('Arquivo vazio.');
                }

                const header = rows[0]
                    .map(col => String(col).trim().toLowerCase());

                const ordemCorreta =
                    header.length === colunasEsperadas.length &&
                    header.every((col, index) => col === colunasEsperadas[index]);

                if (!ordemCorreta) {
                    return reject(
                        'O cabeçalho deve ser exatamente: codigo, nome, preco.'
                    );
                }

                for (let i = 1; i < rows.length; i++) {
                    const [codigo, nome, preco] = rows[i];

                    const linhaVazia =
                        !codigo && !nome && !preco;

                    if (linhaVazia) {
                        return reject(
                            `Linha ${i + 1} está vazia.`
                        );
                    }

                    if (!codigo || !nome || preco === '') {
                        return reject(
                            `Linha ${i + 1} possui campos obrigatórios vazios.`
                        );
                    }

                    if (isNaN(Number(preco))) {
                        return reject(
                            `Linha ${i + 1}: o campo "preco" deve ser numérico.`
                        );
                    }
                }
                resolve();
            };

            reader.readAsArrayBuffer(file);
        });
    };

    return (
        <div>
            <h2 className="text-xl mb-2 font-bold text-roxo">Missoess</h2>
            <Button
                onClick={() => setGavetaCriar(true)}
                className="w-full h-12! mb-4"
                shape="round"
                type="primary"
            >
                Novo missoes
            </Button>

            <div className="lg:hidden">
                <Table
                    dataSource={missoes}
                    rowKey={"id"}
                >
                    <Table.Column
                        title="Missoes"
                        render={(_, linha) => (
                            <div>
                                <div className="flex gap-2">
                                    { linha.concorrentes.foto ? (
                                        <Image
                                            src={linha.concorrentes.foto}
                                            alt={linha.concorrentes.nome}
                                            width={50}
                                            height={50}
                                            className="rounded-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = img
                                            }}
                                        />

                                    ): (
                                        <Image
                                            src={img}
                                            alt={linha.concorrentes.nome}
                                            width={50}
                                            height={50}
                                            className="rounded-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = img
                                            }}
                                        />
                                    )}
                                    <div>
                                        <Tag variant="outlined">{linha.id}</Tag>
                                        <h6><strong>Nome:</strong> {linha.concorrentes.nome}</h6>
                                        <h6><strong>Status:</strong> {linha.status}</h6>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    
                                    <Popconfirm
                                        title="Aviso:"
                                        description="Deseja realmente apagar?"
                                        okText="Sim"
                                        cancelText="Não"
                                        onConfirm={() => deletar(linha.id)}
                                    >
                                        <Button
                                            icon={<LuTrash2 />}
                                            shape="circle"
                                            type="primary"
                                        />
                                    </Popconfirm>
                                </div>
                            </div>
                        )}
                    />
                </Table>
            </div>
            <div className="hidden lg:block">
                <Table
                    dataSource={missoes}
                    rowKey={"id"}
                >
                    <Table.Column
                        rowKey="id"
                        dataIndex={"id"}
                        title="Id"
                    />
                    <Table.Column
                        rowKey="nome"
                        dataIndex={"nome"}
                        title="Nome"
                    />
                    {/* <Table.Column 
                        rowKey="email"
                        dataIndex={"email"}
                        title="Email"
                    /> */}
                    <Table.Column
                        title="Ações"
                        render={(_, linha) => (
                            <div className="flex">
                                <Button
                                    icon={<LuPencil />}
                                    shape="circle"
                                    type="primary"
                                />
                                <Button
                                    icon={<LuTrash2 />}
                                    shape="circle"
                                    type="primary"
                                />
                            </div>
                        )}
                    />
                </Table>
            </div>

            <Drawer
                open={gavetaCriar}
                onClose={() => setGavetaCriar(false)}
                title="Criar"
            >
                <Form
                    onFinish={criar}
                    encType="multipart/form-data"
                    layout="vertical"
                >
                    <Form.Item
                        label={"Concorrente"}
                        name={"concorrente_id"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Select
                        placeholder = "Escolha um Concorrente"
                        options={
                            concorrentes.map (concorrente => {
                                return{
                                    value:concorrente.id, 
                                    label:concorrente.nome
                                }
                            }) 
                        }/>

                    </Form.Item>
                    <Form.Item
                        label={"Usuário"}
                        name={"usuario_id"}
                        
                    >
                        <Select
                        placeholder = "Escolha um Usuário"
                        options={
                            usuarios.map (usuario => {
                                return{
                                    value:usuario.id, 
                                    label:usuario.nome
                                }
                            }) 
                        }/>
                    </Form.Item>
                    <Form.Item
                        label="Arquivo"
                        name={'arquivo'}
                        valuePropName="file"
                        getValueFromEvent={(e) => e.file}
                        rules={[{ required: true, message: 'Campo obrigatório' }]}
                    >
                        <Upload
                            accept=".xls,.xlsx,.csv"
                            maxCount={1}
                            beforeUpload={async (file) => {
                                try {
                                    await validarArquivo(file);
                                    api.success({ description: 'Arquivo válido!' });
                                    return false;
                                } catch (erro) {
                                    api.error({ description: erro });
                                    return Upload.LIST_IGNORE;
                                }
                            }}
                        >
                            <Button type="primary">
                                <LuUpload /> Carregar lista de produtos
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Button
                        className="w-full h-12!"
                        shape="round"
                        type="primary"
                        htmlType="submit"
                        loading={criarPending}
                    >
                        Criar
                    </Button>
                </Form>
            </Drawer>

            <Drawer
                open={gavetaEditar}
                onClose={() => setGavetaEditar(false)}
                title="Editar"
            >
                <Form
                    onFinish={editar}
                    form={formEditar}
                     encType="multipart/form-data"
                >
                    <Form.Item
                        name={"id"}
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"Nome"}
                        name={"nome"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input className="pl-3!" />
                    </Form.Item>
                    <Form.Item
                        label={"Endereço"}
                        name={"endereco"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input className="pl-3!" />
                    </Form.Item>
                    <Form.Item
                        label={"Tipo"}
                        name={"tipo"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Select
                            placeholder="Escolha o tipo"
                            options={
                                [
                                    {
                                        label: "Loja Online",
                                        value: "Loja Online"
                                    },
                                    {
                                        label: "Loja Física",
                                        value: "Loja Física"
                                    }
                                ]
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name={"foto"}
                        label={"foto"}

                        valuePropName="file"
                        getValueFromEvent={(e) => e.file}
                    >
                        <Upload
                            listType="picture-card"
                            beforeUpload={() => false}
                            accept="image/*"
                            maxCount={1}
                        >
                            <LuPlus />
                        </Upload>
                    </Form.Item>
                    <Button
                        className="w-full h-12!"
                        shape="round"
                        type="primary"
                        htmlType="submit"
                        loading={editarPending}
                    >
                        Editar
                    </Button>
                </Form>
            </Drawer>
        </div>
    );
}

export default Missoes;