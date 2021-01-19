var assert = require('assert')
import { parseHTML } from '../src/parser'

describe('parse html:', function () {
  it('<a></a>', function () {
    let tree = parseHTML('<a></a>')
    // {
    //   type: 'document',
    //   children: [
    //     {
    //       type: 'element',
    //       children: [Array],
    //       attributes: [],
    //       tagName: 'a',
    //       parent: [Circular]
    //     }
    //   ]
    // }
    // console.log(tree)
    assert.equal(tree.children[0].tagName, 'a')
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a href="//time.geekbang.org"></a>', function () {
    let tree = parseHTML('<a href="//time.geekbang.org></a>')
    // console.log(tree)
    assert.equal(tree.children.length, 1)
    assert.equal(tree.children[0].children.length, 0)
  })
  // afterAttributeName
  it('<a href ></a>', function () {
    let tree = parseHTML('<a href ></a>')
    assert.equal(tree.children.length, 1)
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a href="#" id ></a>', function () {
    let tree = parseHTML('<a href="#" id ></a>')
    assert.equal(tree.children.length, 1)
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a href id ></a>', function () {
    let tree = parseHTML('<a href id ></a>')
    assert.equal(tree.children.length, 1)
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a id=abc ></a>', function () {
    let tree = parseHTML('<a id=abc ></a>')
    assert.equal(tree.children.length, 1)
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a id=abc />', function () {
    let tree = parseHTML('<a id=abc />')
    assert.equal(tree.children.length, 1)
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a id=\'abc\' />', function () {
    let tree = parseHTML('<a id=\'abc\' />')
    assert.equal(tree.children.length, 1)
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a />', function () {
    let tree = parseHTML('<a />')
    assert.equal(tree.children.length, 1)
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<A /> upper case', function () {
    let tree = parseHTML('<A />')
    assert.equal(tree.children.length, 1)
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<>', function () {
    let tree = parseHTML('<>')
    assert.equal(tree.children.length, 1)
    assert.equal(tree.children[0].type, 'text')
  })
})
