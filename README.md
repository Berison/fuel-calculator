# An app for Android/iOS/Web to calculate vehicle fuel consumption.

## Technologies used:

- Angular 20 (Zone)
- Ionic 8
- Firebase 11.10

## Database

Subcollections method
users → {uid} → cars → {carId}
Updated rules for Firebase:
match /users/{userId} {

allow read, write: if request.auth != null
&& request.auth.uid == userId;

match /cars/{carId} {
allow read, write: if request.auth != null
&& request.auth.uid == userId;
}
}
