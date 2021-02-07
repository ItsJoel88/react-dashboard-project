# React - Redux Saga Based

> This is a react based apps using redux saga, with example of basic route authentication using cookies

> Support Sass for styling


### Installation
---
```
npm install
```
or
```
yarn install
```
and then make you create your *.env* file, and copy the key from *.env.example* into your *.env* file


### Env Guidance
---
Key | Value | Description
--- | ----- | -----------
PORT | number | this is a port for your react app , if you dont use this, default is 3000
FAST_REFRESH | true or false | if false , react will use hot reload instead of fast refresh


### *src* Folder Guidance
---
Name | Description
---- | -----------
**assets** | images, icon, etc.
**components** | shareable components for all layout / pages
**layouts** | if you use same layout for different menu, you can place those layout here
**pages** | place your menu here, and always use PascalCase , e.g: Profile, Product, Voucher
**router** | this is where the routing is being placed
**store** | redux global store
**styles** | where you put your styling with ext: .sass, .scss, .css