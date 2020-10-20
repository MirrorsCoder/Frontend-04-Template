// 在一个字符串中，找到字符”a”
function match(string) {
  for (let c of string) {
    if (c == 'a') return true
  }
  return false
}
console.log(match('I am groot!'))

// 在一个字符串中，找到字符“ab”
function match(string) {
  let foundA = false
  for (let c of string) {
    if (c == 'a') foundA = true
    else if (foundA && c == 'b') return true
    else foundA = false
  }
  return false
}
console.log(match('I abm groot!'))

// 在一个字符串中，找到字符“abcdef”
function match(string) {
  let foundA = false
  let foundB = false
  let foundC = false
  let foundD = false
  let foundE = false
  for (let c of string) {
    if (c == 'a') foundA = true
    else if (foundA && c == 'b') foundB = true
    else if (foundB && c == 'c') foundC = true
    else if (foundC && c == 'd') foundD = true
    else if (foundD && c == 'e') foundE = true
    else if (foundE && c == 'f') return true
    else {
      foundA = false
      foundB = false
      foundC = false
      foundD = false
      foundE = false
    }
  }
  return false
}
console.log(match('I mabcdefgroot'))

// 使用状态机处理字符串"abcdef"
function match(string) {
  let state = start
  for (let c of string) state = state(c)
  return state === end
}
function start(c) {
  if (c === 'a') return foundA
  else return start
}
// trap陷阱，一旦进入状态不再改变
function end(c) {
  return end
}
function foundA(c) {
  if (c === 'b') return foundB
  else return start(c)
}
function foundB(c) {
  if (c === 'c') return foundC
  else return start(c)
}
function foundC(c) {
  if (c === 'd') return foundD
  else return start(c)
}
function foundD(c) {
  if (c === 'e') return foundE
  else return start(c)
}
function foundE(c) {
  if (c === 'f') return end
  else return start(c)
}
console.log(match('I mabcdefgroot'))
console.log(match('ababcdefgh'))

// 字符串“abcabx”的解析
function match(string) {
  let state = start
  for (let c of string) state = state(c)
  return state === end
}
function start(c) {
  if (c === 'a') return foundA
  else return start
}
// trap陷阱，一旦进入状态不再改变
function end(c) {
  return end
}
function foundA(c) {
  if (c === 'b') return foundB
  else return start(c)
}
function foundB(c) {
  if (c === 'c') return foundC
  else return start(c)
}
function foundC(c) {
  if (c === 'a') return foundA2
  else return start(c)
}
function foundA2(c) {
  if (c === 'b') return foundB2
  else return start(c)
}
function foundB2(c) {
  if (c === 'x') return end
  else return foundB(c)
}
console.log(match('abcabcabx'))

// 使用状态机完成”abababx”的处理
function match(string) {
  let state = start
  for (let c of string) state = state(c)
  return state === end
}
function start(c) {
  if (c === 'a') return foundA
  else return start
}
// trap陷阱，一旦进入状态不再改变
function end(c) {
  return end
}
function foundA(c) {
  if (c === 'b') return foundB
  else return start(c)
}
function foundB(c) {
  if (c === 'a') return foundA1
  else return start(c)
}
function foundA1(c) {
  if (c === 'b') return foundB1
  else return start(c)
}
function foundB1(c) {
  if (c === 'a') return foundA3
  else return start(c)
}
function foundA3(c) {
  if (c === 'b') return foundB3
  else return start(c)
}
function foundB3(c) {
  if (c === 'x') return end
  else return start(c)
}
console.log(match('abqabababx'))
