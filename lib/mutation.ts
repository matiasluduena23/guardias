// import { Guardia, Estado } from "@prisma/client";
// import { GuardiaT } from "./definitions";

// export async function addGuardia(
//   guardia: GuardiaT
// ): Promise<{ id: string } | { error: string }> {
//   const estado: Estado = guardia.profesional ? "CUBIERTA" : "VACANTE";
//   const data = { ...guardia, estado };
//   try {
//     const res = await fetch("/cargar", {
//       body: JSON.stringify(data),
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) throw new Error("Error in the server");

//     return res.json();
//   } catch (error) {
//     return { error: "Error creating the guardia" };
//   }
// }
