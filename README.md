# Requirements

PHP 8

# Install dependencies

```
composer install
```

```
npm install
```

```
py -m pip install -r requirements.txt
```

# Create .env file

Edit the `DB_CONNECTION` variable to match your database name.

```
copy .env.example .env
```

# Migrate database

Apply database seeding (initial data) as well.

```
php artisan migrate --seed
```

# Generate application key

```
php artisan key:generate
```

# Start the application

In separate terminals, run

```
php artisan serve --host=0.0.0.0
```

```
npm run dev
```

```
.\run.bat
```
