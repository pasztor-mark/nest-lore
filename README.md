# kezdés
- `npm install @nestjs/cli`
- `npx nest new [projekt neve]`
- `npm install --save @nestjs/passport passport passport-local`
  - authentication réteget biztosítja
- `npm install --save-dev @types/passport-local`
- `npm install --save @nestjs/jwt passport-jwt`
- `npm install --save-dev @types/passport-jwt`
  - auth réteget kiegészíti
- `npm install prisma --save-dev`
- `npx prisma init`

## schema beállítások
- db drivert mysqlre, ha azt használtok, url ott env fájlban állítsátok be
- formátum:
- `{protokoll}://{user}:{password}@{address}:{port}/{db-neve}`
- pl. `mysql://root@localhost:3306/authdemo`

ne felejtsük el a src mappában a `prisma.service.ts` fájlt létérehozni

# auth
- `npx nest g module auth`
- `npx nest g service auth`
- nem kell teljes resource, mert nem kell dto és kontroller
- az authentikációs elérhetőségeket a **users** modulban érjük el
## users
- `npx nest g module users`
- `npx nest g service users`

## Resource komponensek
-  **Module**
  - a resource átadásáért felelős, megszabhatjuk az exportokat és a szolgáltatásokat amiket használ
  - prisma használata mellett ne felejtsük importálni a prisma servicet!
- **Controller**
  - útvonal kiosztásért felelős komponens, az elérési útvonalakat átirányítja a service-ben megszabott funkciókra
- **Service**
  - a kiosztott útvonalakat kiszolgálja, itt történik a backend logika
ezeket már ritkábban kell használni
- **Strategy**
  - authnál használt middleware logika
- **Decorator**
  - Kérési paraméterek, jelölése @[Decorator]