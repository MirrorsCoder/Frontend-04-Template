function kmp(source, pattern) {
  //计算table
  let table = new Array(pattern.length).fill(0)
  {
    //判断是否自重复从1开始，已重复次数j
    let i = 1
    let j = 0

    while (i < pattern.length) {
      if (pattern[i] === pattern[j]) {
        ++j, ++i
        //记录重复次数j
        table[i] = j
      } else {
        if (j > 0) j = table[j]
        else {
          ++i
        }
      }
    }
  }
  // console.log(table)

  //abcdabce
  //aabaaac

  //匹配
  {
    let i = 0
    let j = 0
    while (i < source.length) {
      if (j === pattern.length) return true
      if (pattern[j] === source[i]) {
        ++i, ++j
      } else {
        if (j > 0) j = table[j]
        else ++i
      }
    }
    return false
  }
}

kmp('', 'abcdabce') // 00000123
kmp('', 'aabaaac') // 0010122

console.log(kmp('aabcde', 'abcdf'))
