# schubert

Musical notation components built on top of [Vexflow](https://github.com/0xfe/vexflow).

**This library is under active development. Things will change.**

[build-badge]: https://circleci.com/gh/khisakuni/schubert/tree/master.svg?style=svg
[build]: https://circleci.com/gh/khisakuni/schubert

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

## Install
```
yarn add schubert
```

## Basic Usage
More docs are coming, but in the meantime here's a basic example.
```javascript
<Score>
    <Sheet>
        <Staff>
            <Measure>
                <Voice>
                    <Note value="c/4" duration="q" />
                    <Note value="f/4" duration="q" />
                    <Note value="g/4" duration="q" />
                    <Note value="c/4" duration="q" />
                </Voice>
            </Measure>
        </Staff>
    </Sheet>
</Score>
```

This will render something like this:
![example image](./readme-example.png)
