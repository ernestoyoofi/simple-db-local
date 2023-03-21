## 🗃️ Simpel database local

sebuah database yang membaca tulis dokument pada lokal dan hanya menggunakan format json.

## ✍️ Parameters

```javascript
class = {
  getAllCollection: Function(),
  setCollection: Function(name: string),
  delCollection: Function(name: string),
  collection: Function(name?: string | "test") => {
    get: Function(_id: string),
    getAll: Function(),
    set: Function(_id: string, data: object = {}),
    edit: Function(_id: string, data: object = {}),
    del: Function(_id: string)
  }
}
```