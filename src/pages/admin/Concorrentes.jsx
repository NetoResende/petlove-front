import { Button, Drawer, Form, Image, Input, Popconfirm, Select, Table, Tag, Upload } from "antd";
import { useContext, useState } from "react";
import { useBuscarConcorrente, useCriarConcorrente, useDeletarConcorrente, useEditarConcorrente } from "../../hooks/ConcorrentesHooks";
import { AuthContext } from "../../contexts/AuthProvider";
import { LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";
import img from "../../assets/img-error.webp";

const Concorrentes = () => {

    const [gavetaCriar, setGavetaCriar] = useState(false);
    const [gavetaEditar, setGavetaEditar] = useState(false);
    const { api } = useContext(AuthContext);
    const { data: concorrentes = [] } = useBuscarConcorrente();
    const { mutate: criarConcorrente, isPending: criarPending } = useCriarConcorrente();
    const { mutate: editarConcorrente, isPending: editarPending } = useEditarConcorrente();
    const { mutate: deletarConcorrente, isPending: deletarPending } = useDeletarConcorrente();

    const [formEditar] = Form.useForm();

    function criar(dados) {
        criarConcorrente(dados, {
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
    }

    function editar(dados) {
        editarConcorrente(dados, {
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
        deletarConcorrente(id, {
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
    return (
        <div>
            <h2 className="text-xl mb-2 font-bold text-roxo">Concorrentes</h2>
            <Button
                onClick={() => setGavetaCriar(true)}
                className="w-full h-12! mb-4"
                shape="round"
                type="primary"
            >
                Novo concorrente
            </Button>

            <div className="lg:hidden">
                <Table
                    dataSource={concorrentes}
                    rowKey={"id"}
                >
                    <Table.Column
                        title="Concorrente"
                        render={(_, linha) => (
                            <div>
                                <div className="flex gap-2">
                                    { linha.foto ? (
                                        <Image
                                            src={linha.foto}
                                            alt={linha.nome}
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
                                            alt={linha.nome}
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
                                        <h6><strong>Nome:</strong> {linha.nome}</h6>
                                        <h6><strong>Enderenço:</strong> {linha.endereco}</h6>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        icon={<LuPencil />}
                                        shape="circle"
                                        type="primary"
                                        onClick={() => {
                                            delete linha.foto;
                                            formEditar.setFieldsValue({ ...linha });
                                            setGavetaEditar(true);
                                        }}
                                    />
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
                    dataSource={concorrentes}
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
                >
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

export default Concorrentes;