export interface Principle {
  statement: string;
  explanation: string;
}

export const principles: Principle[] = [
  {
    statement: 'La fiabilidad forma parte del producto.',
    explanation:
      'Permisos, reintentos, conflictos y recuperación se deciden mientras la funcionalidad se diseña. Añadidos después, se convierten en el incidente de otra persona.',
  },
  {
    statement: 'Una buena arquitectura hace el cambio más seguro, no solo más limpio.',
    explanation:
      'Juzgo un diseño por la confianza con la que la siguiente persona puede modificarlo — no por lo elegante que se vea el diagrama.',
  },
  {
    statement: 'La documentación existe para hacer verificables las afirmaciones.',
    explanation:
      'Un contrato, un test o un runbook valen más que una descripción de intenciones. Si afirmo un comportamiento, tiene que haber algo que puedas ejecutar.',
  },
  {
    statement: 'La IA es útil cuando sus límites son explícitos.',
    explanation:
      'En producción defino qué puede invocar el modelo, qué no debe decidir nunca por sí solo y qué ocurre cuando se equivoca. Eso fue lo que hizo operable el asistente de Chiper.',
  },
];
