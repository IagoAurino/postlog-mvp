function validarCredenciais(re, senha) {
    if (!re || !senha) return false;
    if (re.length > 10) return false;
    return true;
}
module.exports = { validarCredenciais };