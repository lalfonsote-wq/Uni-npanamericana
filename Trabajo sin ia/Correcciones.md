# Guía paso a paso para corregir `torneo.html`

Archivo a corregir: `clase DBZ/torneo.html`

Esta guía está pensada para corregir la práctica sin cambiar toda la estructura. La idea es conservar el HTML y reparar principalmente la lógica de JavaScript.

## Paso 1: Corregir la lectura de datos del formulario

Dentro de la función `registrarParticipante()`, el estudiante escribió variables como estas:

```js
const nombreInput = nombreInput.value.trim();
const edadInput = Number(edadInput.value);
```

Eso está mal porque `nombreInput` y `edadInput` ya existen como elementos del HTML. No se deben volver a declarar con el mismo nombre.

Debe reemplazar esa parte por:

```js
const nombre = nombreInput.value.trim();
const edad = Number(edadInput.value);
const usuario = usuarioInput.value.trim().toLowerCase();
const nivel = nivelSelect.value;
const tieneMembresia = membresiaCheckbox.checked;
const codigo = codigoInput.value.trim().toUpperCase();
```

Con esto:

- `nombre` guarda el nombre limpio.
- `edad` guarda la edad convertida a número.
- `usuario` guarda el usuario limpio y en minúsculas.
- `nivel` guarda el nivel seleccionado.
- `tieneMembresia` guarda un valor booleano: `true` o `false`.
- `codigo` guarda el código limpio y en mayúsculas.

## Paso 2: Corregir el error de la variable de membresía

En el código aparece:

```js
const membresiaCheckbox = membresíaCheckbox.checked;
```

Ese nombre está mal porque tiene tilde: `membresíaCheckbox`.

La variable correcta ya fue definida arriba como:

```js
const membresiaCheckbox = document.getElementById("membresia");
```

Por eso, dentro de `registrarParticipante()` debe usarse:

```js
const tieneMembresia = membresiaCheckbox.checked;
```

## Paso 3: Corregir las variables booleanas

El estudiante debe reemplazar las validaciones actuales por estas:

```js
const nombreValido = nombre.length >= 3;

const tieneEspacios = usuario.indexOf(" ") !== -1;
const contieneAdmin = usuario.indexOf("admin") !== -1;
const contieneModerador = usuario.indexOf("moderador") !== -1;

const usuarioValido =
    !tieneEspacios &&
    !contieneAdmin &&
    !contieneModerador &&
    usuario.length > 0;

const codigoValido =
    codigo === "GAME2026" ||
    codigo === "VIP2026" ||
    codigo === "STUDENT";
```

Explicación:

- `nombreValido` revisa que el nombre tenga al menos 3 caracteres después de `trim()`.
- `tieneEspacios` busca espacios dentro del usuario usando `indexOf()`.
- `contieneAdmin` busca la palabra `"admin"`.
- `contieneModerador` busca la palabra `"moderador"`.
- `usuarioValido` solo será `true` si el usuario no tiene espacios ni palabras prohibidas.
- `codigoValido` revisa los tres códigos válidos del enunciado.

## Paso 4: Corregir la validación de cupos

Esta parte está bien encaminada:

```js
if (cuposDisponibles <= 0) {
    estado = "rechazado";
    mensaje = "No quedan cupos disponibles.";
}
```

Debe quedarse al inicio de las validaciones, antes de aprobar a cualquier participante.

## Paso 5: Corregir la validación del nombre

Debe quedar así:

```js
else if (!nombreValido) {
    estado = "rechazado";
    mensaje = "El nombre debe tener al menos 3 caracteres.";
}
```

Esto rechaza:

- Nombre vacío.
- Nombre con solo espacios.
- Nombre de menos de 3 caracteres.

## Paso 6: Corregir la validación de edad inválida

Debe validar que la edad exista y sea razonable:

```js
else if (edad <= 0 || edad > 130 || isNaN(edad)) {
    estado = "rechazado";
    mensaje = "Debes ingresar una edad válida.";
}
```

Aquí se usa `||` porque basta con que una de esas condiciones sea verdadera para rechazar.

## Paso 7: Corregir la validación del usuario

Debe quedar así:

```js
else if (!usuarioValido) {
    estado = "rechazado";
    mensaje = "El nombre de usuario no puede estar vacío, tener espacios, ni contener admin o moderador.";
}
```

El usuario no debe contener:

- Espacios.
- `"admin"`.
- `"moderador"`.

## Paso 8: Validar el nivel

Debe quedar así:

```js
else if (!nivel) {
    estado = "rechazado";
    mensaje = "Debes seleccionar un nivel.";
}
```

Esto evita registrar participantes sin nivel de experiencia.

## Paso 9: Corregir la regla para menores de 13 años

El estudiante escribió:

```js
else if (edad > 13)
```

Eso está al revés.

Debe ser:

```js
else if (edad < 13) {
    estado = "rechazado";
    mensaje = "Debes tener al menos 13 años.";
}
```

## Paso 10: Corregir la regla de 13 a 15 años

Regla del enunciado:

Los participantes entre 13 y 15 años necesitan membresía.

Código recomendado:

```js
else if (edad >= 13 && edad <= 15 && !tieneMembresia) {
    estado = "rechazado";
    mensaje = "Los participantes de 13 a 15 años necesitan membresía.";
}
else if (edad >= 13 && edad <= 15 && tieneMembresia) {
    aprobado = true;
    estado = "condicional";
    mensaje = "Participante aprobado con condiciones por ser menor de edad y tener membresía.";
}
```

Aquí se usa `&&` porque deben cumplirse varias condiciones al mismo tiempo.

## Paso 11: Corregir la regla de 16 a 17 años

Regla del enunciado:

Los participantes de 16 y 17 años pueden entrar con membresía o con código válido.

Código recomendado:

```js
else if (edad >= 16 && edad <= 17 && (tieneMembresia || codigoValido)) {
    aprobado = true;
    estado = "condicional";
    mensaje = "Participante aprobado con condiciones por membresía o código de invitación.";
}
else if (edad >= 16 && edad <= 17) {
    estado = "rechazado";
    mensaje = "Los participantes de 16 y 17 años necesitan membresía o un código válido.";
}
```

Aquí se usa:

- `&&` para exigir que tenga entre 16 y 17 años.
- `||` para aceptar membresía o código válido.

## Paso 12: Corregir la regla para mayores de 70 años

Regla del enunciado:

Mayor de 70 años debe mostrar mensaje especial, pero permitir el registro.

Esta validación debe ir antes de la regla general de 18 años o más:

```js
else if (edad > 70) {
    aprobado = true;
    estado = "aprobado";
    mensaje = "Participante aprobado. Mensaje especial: gracias por participar en el torneo.";
}
```

## Paso 13: Corregir la regla de 18 años o más

Los participantes de 18 años o más pueden entrar directamente:

```js
else if (edad >= 18) {
    aprobado = true;
    estado = "aprobado";
    mensaje = "Participante registrado correctamente.";
}
```

No debe exigir que el nivel sea `"avanzado"`, porque el enunciado no pide eso.

## Paso 14: Revisar el bloque completo de validaciones

El bloque completo de validación debe quedar en este orden:

```js
if (cuposDisponibles <= 0) {
    estado = "rechazado";
    mensaje = "No quedan cupos disponibles.";
}
else if (!nombreValido) {
    estado = "rechazado";
    mensaje = "El nombre debe tener al menos 3 caracteres.";
}
else if (edad <= 0 || edad > 130 || isNaN(edad)) {
    estado = "rechazado";
    mensaje = "Debes ingresar una edad válida.";
}
else if (!usuarioValido) {
    estado = "rechazado";
    mensaje = "El nombre de usuario no puede estar vacío, tener espacios, ni contener admin o moderador.";
}
else if (!nivel) {
    estado = "rechazado";
    mensaje = "Debes seleccionar un nivel.";
}
else if (edad < 13) {
    estado = "rechazado";
    mensaje = "Debes tener al menos 13 años.";
}
else if (edad >= 13 && edad <= 15 && !tieneMembresia) {
    estado = "rechazado";
    mensaje = "Los participantes de 13 a 15 años necesitan membresía.";
}
else if (edad >= 13 && edad <= 15 && tieneMembresia) {
    aprobado = true;
    estado = "condicional";
    mensaje = "Participante aprobado con condiciones por ser menor de edad y tener membresía.";
}
else if (edad >= 16 && edad <= 17 && (tieneMembresia || codigoValido)) {
    aprobado = true;
    estado = "condicional";
    mensaje = "Participante aprobado con condiciones por membresía o código de invitación.";
}
else if (edad >= 16 && edad <= 17) {
    estado = "rechazado";
    mensaje = "Los participantes de 16 y 17 años necesitan membresía o un código válido.";
}
else if (edad > 70) {
    aprobado = true;
    estado = "aprobado";
    mensaje = "Participante aprobado. Mensaje especial: gracias por participar en el torneo.";
}
else if (edad >= 18) {
    aprobado = true;
    estado = "aprobado";
    mensaje = "Participante registrado correctamente.";
}
```

## Paso 15: Corregir los contadores al registrar

Cuando el participante sea aprobado, debe quedar:

```js
if (aprobado === true) {
    participantesAprobados++;
    cuposDisponibles--;

    const participante = {
        nombre: nombre,
        edad: edad,
        usuario: usuario,
        nivel: nivel,
        tieneMembresia: tieneMembresia,
        codigoValido: codigoValido,
        estado: estado
    };

    participantes.push(participante);

    mostrarParticipantes();
    limpiarFormulario();
}
```

Esto cumple con:

```js
participantesAprobados++;
cuposDisponibles--;
```

## Paso 16: Mostrar también el nivel y el estado

El mensaje final debe mostrar más información. Puede quedar así:

```js
const textoMembresia =
    tieneMembresia
        ? "Membresía activa"
        : "Sin membresía";

mensajeElemento.className = estado;

mensajeElemento.innerHTML = `
    <h3>${mensaje}</h3>

    <p>
        <strong>Nombre:</strong>
        ${nombre || "No disponible"}
    </p>

    <p>
        <strong>Membresía:</strong>
        ${textoMembresia}
    </p>

    <p>
        <strong>Nivel:</strong>
        ${nivel || "No seleccionado"}
    </p>

    <p>
        <strong>Estado:</strong>
        ${estado || "rechazado"}
    </p>
`;
```

## Paso 17: Mostrar el estado en la lista de participantes

Dentro de `mostrarParticipantes()`, puede agregar este párrafo:

```js
<p>
    Estado:
    ${participante.estado}
</p>
```

Así la lista muestra si fue aprobado o aprobado con condiciones.

## Paso 18: Corregir el botón de cancelar último registro

Actualmente elimina el último participante, pero no actualiza los contadores.

Después de:

```js
const participanteEliminado = participantes.pop();
```

Debe agregar:

```js
participantesAprobados--;
cuposDisponibles++;
```

La función debe quedar así en esa parte:

```js
const participanteEliminado = participantes.pop();

participantesAprobados--;
cuposDisponibles++;

mostrarParticipantes();
actualizarEstadisticas();
```

## Paso 19: Corregir los mensajes informales

Debe cambiar mensajes como:

```js
mensaje = "privilegio otorgao";
mensaje = "tu ere competitivo";
```

Por mensajes más claros:

```js
mensaje = "Participante aprobado con mensaje especial.";
mensaje = "Participante registrado correctamente.";
```

## Paso 20: Probar casos obligatorios

Después de corregir, debe probar estos casos:

| Caso | Datos | Resultado esperado |
|---|---|---|
| Nombre vacío | Nombre con espacios | Rechazado |
| Nombre corto | `Lu` | Rechazado |
| Menor de 13 | Edad `12` | Rechazado |
| 13 a 15 sin membresía | Edad `14`, sin membresía | Rechazado |
| 13 a 15 con membresía | Edad `14`, con membresía | Aprobado con condiciones |
| 16 a 17 sin membresía ni código | Edad `16` | Rechazado |
| 16 a 17 con código | Edad `16`, código `GAME2026` | Aprobado con condiciones |
| 18 o más | Edad `18` | Aprobado |
| Mayor de 70 | Edad `71` | Aprobado con mensaje especial |
| Usuario con espacio | `jugador uno` | Rechazado |
| Usuario con admin | `admin123` | Rechazado |
| Usuario con moderador | `moderador22` | Rechazado |
| Código válido | `VIP2026` | Debe ser aceptado |
| Cupos llenos | Registrar 10 aprobados | El siguiente debe ser rechazado |
| Cancelar registro | Cancelar último | Debe bajar aprobados y recuperar cupo |

## Paso 21: Lista de requisitos que debe verificar al final

Antes de entregar, el estudiante debe confirmar que usó:

- `else if`
- `||`
- `&&`
- Operador ternario `? :`
- `innerHTML`
- Valores booleanos
- `indexOf()`
- `trim()`
- Incremento `++`
- Decremento `--`

## Resultado esperado después de corregir

Cuando todo esté bien, la aplicación debe:

- Registrar participantes válidos.
- Rechazar participantes que no cumplen reglas.
- Mostrar aprobados con condiciones cuando aplique.
- Limpiar el nombre con `trim()`.
- Validar usuario con `indexOf()`.
- Validar códigos `GAME2026`, `VIP2026` y `STUDENT`.
- Actualizar participantes aprobados.
- Actualizar cupos disponibles.
- Mostrar la lista de participantes registrados.
- Permitir cancelar el último registro y recuperar el cupo.