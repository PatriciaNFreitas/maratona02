const Profile = require('../model/Profile')

module.exports = {
    async index(req, res){
        return res.render("profile", {profile: await Profile.get()})
    }, 
 
 async update(req, res) {
  //req.body para pegar os dados
  const data = req.body
  //definir quantas semanas tem em um ano:52
  const weeksPerYear = 52
  //remover as semanas de férias do ano,pegar quantas semnas tem em um mês
  const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12 
  //quantas horas por semana estou trabalhando
  const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
  //total de horas trabahadas no mês
  const monthlyTotalHours = weekTotalHours * weeksPerMonth
  // qual será o valor da minha horas
  const valueHour = data ["monthly-budget"] / monthlyTotalHours
 
  const profile = await Profile.get()
 Profile.update ({
     ...profile,
     ...req.body,
     "value-hour": valueHour
 })
 return res.redirect("/profile")
 }
 }
 
 
 