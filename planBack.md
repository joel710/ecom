Architecture Backend - Lumi E-commerce

Ce document détaille la structure technique pour transformer la maquette Lumi en une application fonctionnelle avec un backend Python (FastAPI/Flask) et PostgreSQL.

1. Stack Technique Préconisée

Langage : Python 3.10+

Framework : FastAPI (pour sa rapidité et sa documentation Swagger automatique).

Base de données : PostgreSQL.

ORM : SQLAlchemy ou Tortoise-ORM.

Validation : Pydantic.

Tâches asynchrones : Celery + Redis (pour l'envoi des messages WhatsApp en arrière-plan).

2. Structure de la Base de Données (PostgreSQL)

Table users

id : UUID (Primary Key)

email : String (Unique)

password_hash : String

full_name : String

phone_number : String (Format international pour WhatsApp)

created_at : Timestamp

Table categories

id : Serial

name : String

slug : String (ex: "vetements")

icon : String (Emoji ou URL)

Table products

id : UUID

category_id : ForeignKey(categories.id)

name : String

description : Text

price : Numeric(10, 2)

stock_quantity : Integer

image_url : String

is_active : Boolean

rating : Float

Table orders

id : UUID

user_id : ForeignKey(users.id)

total_price : Numeric(10, 2)

status : Enum (pending, paid, shipped, cancelled)

whatsapp_sent : Boolean

created_at : Timestamp

Table order_items

id : UUID

order_id : ForeignKey(orders.id)

product_id : ForeignKey(products.id)

quantity : Integer

unit_price : Numeric(10, 2)

3. Liste des Endpoints API

Auth

POST /auth/register : Inscription.

POST /auth/login : Connexion (retourne un JWT).

Produits & Catégories

GET /categories : Liste toutes les catégories.

GET /products : Liste les produits (avec filtres category, search, min_price).

GET /products/{id} : Détails d'un produit.

Panier & Commandes

POST /orders : Création d'une commande (Validation du stock).

GET /orders/me : Historique des commandes de l'utilisateur.

4. Logique Métier : Validation & WhatsApp

Processus de Validation de Commande

Transaction DB : Vérifier le stock de chaque item.

Décrémentation : Réduire le stock.

Persistance : Créer l'entrée orders et les order_items.

Génération du message WhatsApp : Compiler les données.

Intégration WhatsApp (Service Webhook)

Pour envoyer la commande au vendeur, on utilise l'API WhatsApp Business ou une solution comme Twilio.

Format du message envoyé au vendeur :

🚀 *Nouvelle Commande Lumi !*
---------------------------
Client : [Nom du client]
Téléphone : [Numéro]

Articles :
- 2x T-shirt Blanc (39.80 €)
- 1x Cookies Chocolat (4.50 €)

*Total : 44.30 €*
---------------------------
Lien de gestion : [URL_ADMIN]


5. Structure du Code (Architecture en Couches)

/app
  /api              # Routes (Endpoints)
  /core             # Configuration (DB, Security)
  /models           # Modèles SQLAlchemy/Postgres
  /schemas          # Schémas Pydantic (Validation)
  /services         # Logique métier (Stock, WhatsApp, Email)
  /crud             # Opérations DB basiques
main.py             # Point d'entrée


6. Sécurité & Scalabilité

CORS : Configurer pour accepter uniquement le domaine du front-end.

Rate Limiting : Limiter le nombre de tentatives de commande par minute pour éviter le spam WhatsApp.

Indexes Postgres : Indexer products.name (GIN index) pour des recherches textuelles rapides.
