# Tira para arriba - Demo

## Cómo correr

```bash
npm install
npm run dev
```

## Credenciales admin

- Usuario: `admin`
- Contraseña: `tpa2026!`

## Dónde cambiar WhatsApp e Instagram

Editar `src/data/settings.json` o desde el panel en `/admin/settings`.

## Import / Export JSON

En el admin:
- Botón **Export JSON** para descargar el snapshot completo.
- Botón **Import JSON** para subir un JSON con la misma estructura.

## Mapas y direcciones reales

Los `mapEmbedUrl` y `directionsUrl` en `src/data/seed.events.json` son placeholders.
Reemplazalos por URLs reales en cada evento desde el admin.

## Checklist demo (5 minutos)

- Ver Home con hero y CTA a WhatsApp.
- Entrar a `/eventos` y probar filtros.
- Abrir un evento y verificar mapa + CTA.
- Ir a `/recaps` y `/faq`.
- Entrar al admin, crear un evento, subir imágenes y exportar JSON.

