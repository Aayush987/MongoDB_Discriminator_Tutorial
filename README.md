# Mongoose Discriminators: Inheritance in MongoDB

Mongoose discriminators allow you to create a flexible inheritance-like structure in your MongoDB schemas. They are especially useful when you want to model multiple types of documents that share a common base structure but also have unique properties.

### What are Discriminators in Mongoose?

In Mongoose, discriminators are a powerful feature that enables you to create a base schema and extend it with different types of schemas, each of which can have its own unique fields. Discriminators are a way to model polymorphic relationships, where different types of documents share some common fields but also have distinct properties.

Discriminators work by adding a `discriminatorKey` field (like `itemtype` in the example) to the schema, allowing you to distinguish between different types of documents that belong to the same collection.

### Why Use Discriminators?

Discriminators are useful when you need to model a "type of" relationship between different entities in the same collection. For example, consider a situation where you have multiple types of "items" — such as `Employee` and `Student` — that share some common attributes but also have unique properties. Discriminators allow you to store all these types in a single collection while still preserving the uniqueness of each type.

#### Inheritance-Like Structure

The idea is to create a base schema with shared fields (e.g., `name`, `gender`, `age`) and then extend it with additional fields specific to each type (e.g., `salary`, `designation` for employees or `grade` for students).

### Example: Employee and Student with Discriminators

Below is a step-by-step breakdown of how to implement a discriminator-based inheritance model using Mongoose.

### 1. **Base Schema (`BaseSchema`)**

In this example, the `BaseSchema` is the common schema shared by all item types. It contains basic fields like `name`, `gender`, and `age`. We also define the `discriminatorKey` (`itemtype`) and specify that all items should be stored in the `items` collection.

```javascript
const mongoose = require('mongoose');

const baseOptions = {
    discriminatorKey: 'itemtype',  // The key that will identify the type of item (Employee, Student, etc.)
    collection: 'items',           // All documents will be stored in the 'items' collection
};

const BaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
}, baseOptions);

module.exports = mongoose.model('Base', BaseSchema);
```

### 2. **Employee Schema**

The `Employee` schema extends `BaseSchema` by adding employee-specific fields like `salary` and `designation`. The `discriminator` method is used to link this schema to the base model and set the type to `"Employee"`.

```javascript
const mongoose = require('mongoose');
const Base = require('./BaseSchema');  // Importing the base schema

const EmployeeSchema = new mongoose.Schema({
    salary: {
        type: Number,
        required: true,
    },
    desig: {
        type: String,
        required: true,
    }
});

const Employee = Base.discriminator('Employee', EmployeeSchema);

module.exports = Employee;
```

### 3. **Student Schema**

The `Student` schema extends the `BaseSchema` by adding a `grade` field. Just like `Employee`, we use the `discriminator` function to link it to the base model and set the type to `"Student"`.

```javascript
const mongoose = require('mongoose');
const Base = require('./BaseSchema');  // Importing the base schema

const StudentSchema = new mongoose.Schema({
    grade: {
        type: Number,
        required: true,
    },
});

const Student = Base.discriminator('Student', StudentSchema);

module.exports = Student;
```

### 4. **Example Data**

Let's see how Mongoose handles the data for `Employee` and `Student`:

#### Employee Data:
```json
{
    "_id": "67f404a58a7233e5ebcc466a",
    "name": "Aryan Kohli",
    "gender": "Male",
    "age": 21,
    "itemtype": "Employee",  // Discriminator field identifying this as an Employee
    "salary": 50000,
    "desig": "Manager",
    "__v": 0
}
```

#### Student Data:
```json
{
    "_id": "67f40348becb78531bb700b3",
    "name": "Aryan Kohli",
    "gender": "Male",
    "age": 21,
    "itemtype": "Student",  // Discriminator field identifying this as a Student
    "grade": 100,
    "__v": 0
}
```

Both the `Employee` and `Student` documents share the common fields (`name`, `gender`, and `age`) from the `BaseSchema`, but they also have their own unique fields (`salary`, `desig` for employees and `grade` for students).

### 5. **Why Use Discriminators in This Case?**

In this case, we use discriminators because:
- **Data Sharing**: Both `Employee` and `Student` share common fields, such as `name`, `gender`, and `age`, so it makes sense to store them in the same `items` collection.
- **Distinct Types**: Although they share some common fields, `Employee` and `Student` have their own unique fields (`salary`, `desig` for employees and `grade` for students). Discriminators allow us to store both types in one collection and still differentiate between them using the `itemtype` field.
- **Polymorphic Queries**: We can query both `Employee` and `Student` documents together but also distinguish between them when needed. For example, we can query all items and filter by `itemtype` or use the appropriate discriminator to create and fetch documents based on their specific type.

### Conclusion

Discriminators in Mongoose are a great way to implement an inheritance-like relationship between documents in MongoDB. This method allows you to store multiple types of documents (such as `Employee`, `Student`, etc.) in a single collection while maintaining their unique attributes and enabling polymorphic queries.

This approach is useful in scenarios where different types of data share common fields but also have specialized properties. It simplifies data management and enhances querying flexibility in MongoDB.

---
