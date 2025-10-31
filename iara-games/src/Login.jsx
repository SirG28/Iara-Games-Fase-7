import { useState } from "react";
import "../src/styles/login.css";

export default function Login() {
    const [email, setEmail] = useState("eve.holt@reqres.in"); // dado de teste da API
    const [senha, setSenha] = useState("cityslicka");         // dado de teste da API
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [ok, setOk] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setErro(""); setOk(""); setLoading(true);
        try {
            const res = await fetch("https://reqres.in/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "reqres-free-v1", // ⬅️ adicione isto
                },
                body: JSON.stringify({ email, password: senha }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Falha ao fazer login");

            // sucesso
            localStorage.setItem("token", data.token);
            //localStorage.setItem("userName", "asdasda");
            setOk("Login realizado com sucesso!");

            // dá um pequeno delay para mostrar a mensagem e redireciona
            setTimeout(() => {
                const url = new URL("/portal/index.html", window.location.origin).toString();
                console.log("Redirecionando para:", url);
                window.location.replace(url); // ou: window.location.href = url;
            }, 700); // pequeno delay só pra mostrar a mensagem
        } catch (err) {
            setErro(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main>
            <a href="/portal/index.html" className="voltar-completo">
                <i className="bi bi-arrow-left" aria-hidden="true"></i>
                <span>Voltar</span>
            </a>

            <header>
                <img src="/images/iara-logo-claro.png" alt="Iara Games" className="logo" />
            </header>

            <section className="formulario" aria-labelledby="titulo-login">
                <h1 id="titulo-login">ENTRAR</h1>

                <form onSubmit={handleSubmit}>
                    <fieldset className="dadosdeacesso">
                        <div className="grupo-campos">
                            <div className="grupoinput">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Ex.: lorem@gmail.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="grupoinput">
                                <label htmlFor="senha">Senha</label>
                                <div className="senha-wrapper">
                                    <input
                                        id="senha"
                                        type={mostrarSenha ? "text" : "password"}
                                        required
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setMostrarSenha(v => !v)}
                                        className="olho-senha"
                                        aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                                    >
                                        <i className={mostrarSenha ? "bi bi-eye-slash" : "bi bi-eye"} />
                                    </button>
                                </div>
                            </div>

                            {erro && <div style={{ color: "crimson" }}>{erro}</div>}
                            {ok && <div style={{ color: "lightgreen" }}>{ok}</div>}

                            <a href="#">Esqueceu a senha?</a>
                            <button type="submit" disabled={loading}>
                                {loading ? "Entrando..." : "Entrar"}
                            </button>
                        </div>
                    </fieldset>

                    <section className="social-login" aria-labelledby="titulo-social-login">
                        <h2 id="titulo-social-login">Ou faça login com:</h2>
                        <div className="icons_sociais">
                            <a href="#" className="loginicon"><img src="/images/formulario/facebook.png" alt="Facebook" /><p>Facebook</p></a>
                            <a href="#" className="loginicon"><img src="/images/formulario/google.png" alt="Google" /><p>Google</p></a>
                            <a href="#" className="loginicon"><img src="/images/formulario/apple.png" alt="Apple" /><p>Apple</p></a>
                            <a href="#" className="loginicon"><img src="/images/formulario/steam.png" alt="Steam" /><p>Steam</p></a>
                            <a href="#" className="loginicon"><img src="/images/formulario/xbox.png" alt="Xbox" /><p>Xbox</p></a>
                            <a href="#" className="loginicon"><img src="/images/formulario/playstation.png" alt="Playstation" /><p>Playstation</p></a>
                        </div>
                    </section>
                </form>

                <nav aria-label="Links úteis">
                    <ul className="linksdebaixo">
                        <li><a href="/cadastro" className="link">Criar Conta</a></li>
                        <li><a href="#" className="link">Política de Privacidade</a></li>
                    </ul>
                </nav>
            </section>

            <footer>
                <p>&copy; 2025 Iara Games. Todos os direitos reservados.</p>
            </footer>
        </main>
    );
}
