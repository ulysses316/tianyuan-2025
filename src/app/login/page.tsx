"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Button from "@/components/shared/Button";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (email === "") {
      setError("Tienes que llenar el campo de email.");
      return null;
    }
    if (password === "") {
      setError("Tienes que llenar el campo de la contraseña.");
      return null;
    }

    await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
    });
  };

  return (
    <>
      <section className="">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              {/* LOGO */}

              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">¡Bienvenido!</h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Estamos muy contentos de que estes tomando el curso en linea de Terapias Integrativas TianYuan, por
                favor inicia sesion para continuar.
              </p>

              {error !== "" && (
                <div className="mt-2 rounded-lg border border-red-500 bg-red-200 px-2 py-1 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={onSubmit} className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                    Correo
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    className="my-1 w-full rounded-sm border-gray-200 bg-white py-1 text-sm text-gray-700 shadow-sm outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    className="my-1 w-full rounded-sm border-gray-200 bg-white py-1 text-sm text-gray-700 shadow-sm outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <Button type="submit">Iniciar sesión</Button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    ¿No estas inscrito al curso?{" "}
                    <a
                      href="https://api.whatsapp.com/send/?phone=5531202502"
                      target="_blank"
                      className="text-gray-700 underline"
                    >
                      Comunicate con nosotros
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
