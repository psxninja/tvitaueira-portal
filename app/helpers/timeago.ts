export const localeFunc = (
	number?: number,
	index?: number,
	totalSec?: number
): [string, string] => {
	// number: the timeago / timein number;
	// index: the index of array below;
	// totalSec: total seconds between date to be formatted and today's date;
	const translatept = [
		['Agora', 'Agora pouco'],
		['há %s segundos', 'há %s segundos'],
		['há 1 minuto', 'há 1 minuto'],
		['há %s minutos', 'há %s minutos'],
		['há 1 hora', 'há 1 hora'],
		['há %s horas', 'há %s horas'],
		['há 1 dia', 'há 1 dia'],
		['há %s dias', 'há %s dias'],
		['há 1 semana', 'há 1 semana'],
		['há %s semanas', 'há %s semanas'],
		['há 1 mês', 'há 1 mês'],
		['há %s meses', 'há %s meses'],
		['há 1 ano', 'há 1 ano'],
		['há %s anos', 'há %s anos']
	]
	const translate = translatept[index || 0] as [string, string]
	return translate
}
