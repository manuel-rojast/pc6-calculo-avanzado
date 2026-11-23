/**
 * GLOSARIO MAESTRO DE SÍMBOLOS Y NOTACIÓN FORMAL — PC6 (CM2A1 - UNI)
 * Sesiones 31 a 36 (Capítulo 05: Integral de Línea):
 *  t1: Curvas Regulares e Integral de Línea Escalar (11)
 *  t2: Integral de Línea de Campos Vectoriales y Trabajo (11)
 *  t3: Conjuntos Convexos y Campos Gradientes (11)
 *  t4: Independencia del Camino, Potenciales y Vórtice (11)
 *  t5: Teorema de Green Simple y Múltiplemente Conexo (11)
 */

if (typeof window === 'undefined') {
  var window = (typeof globalThis !== 'undefined') ? globalThis : this;
}

window.GLOSSARY_TOPICS = {
  t1: { id: 't1', name: 'Subtema 1: Integral de Línea Escalar', shortName: 'Subtema 1: Escalar', icon: '〰️' },
  t2: { id: 't2', name: 'Subtema 2: Integral Vectorial & Trabajo', shortName: 'Subtema 2: Vectorial', icon: '➡️' },
  t3: { id: 't3', name: 'Subtema 3: Convexos & Campos Gradientes', shortName: 'Subtema 3: Gradientes', icon: '🧭' },
  t4: { id: 't4', name: 'Subtema 4: Potenciales & Vórtice', shortName: 'Subtema 4: Potenciales', icon: '🌀' },
  t5: { id: 't5', name: 'Subtema 5: Teorema de Green', shortName: 'Subtema 5: Green', icon: '🔄' }
};

window.GLOSSARY_DATA = [
  // ==================== T1: INTEGRAL DE LÍNEA ESCALAR (11) ====================
  {
    id: 't1-01',
    topic: 't1',
    symbol: '$\\alpha : [a, b] \\to \\mathbb{R}^n,\\; \\alpha \\in C^1,\\; \\alpha\'(t) \\neq \\vec{0}$',
    name: 'Curva Parametrizada Regular',
    reading: 'alfa de a coma b en erre a la ene de clase C uno con vector velocidad no nulo',
    simple: 'Es la película de una partícula que recorre la curva sin detenerse jamás ni dar frenazos bruscos; garantiza que existe una recta tangente bien definida en cada punto.',
    action: 'Al parametrizar una curva $C$, especifica siempre el intervalo $[a,b]$ y comprueba que $\\alpha\'(t) \\neq \\vec{0}$ en $(a,b)$.',
    trap: 'Olvidar indicar el intervalo paramétrico $[a,b]$ o usar una parametrización que recorre la curva dos veces (duplicando la integral).'
  },
  {
    id: 't1-02',
    topic: 't1',
    symbol: '$C = C_1 \\cup C_2 \\cup \\dots \\cup C_k$',
    name: 'Curva Regular a Trozos (Seccionalmente Suave)',
    reading: 'curva C unión finita de arcos regulares C sub 1 hasta C sub k',
    simple: 'Una trayectoria formada al pegar una cantidad finita de tramos suaves (por ejemplo, el perímetro de un triángulo o un cuadrado con esquinas).',
    action: 'Divide la integral sobre $C$ en la suma de las integrales sobre cada segmento o arco liso $C_i$: $\\int_C = \\sum_{i=1}^k \\int_{C_i}$.',
    trap: 'Intentar hallar una sola fórmula diferenciable para un contorno con vértices (polígonos) en vez de parametrizar lado por lado.'
  },
  {
    id: 't1-03',
    topic: 't1',
    symbol: '$ds = \\|\\alpha\'(t)\\|\\,dt = \\sqrt{(x\'(t))^2 + (y\'(t))^2 + (z\'(t))^2}\\,dt$',
    name: 'Elemento Diferencial de Longitud de Arco',
    reading: 'diferencial de longitud de arco ese igual a la norma de alfa prima de te por diferencial de te',
    simple: 'Es la distancia diminuta que avanza la partícula durante un instante $dt$: rapidez $\\|\\alpha\'(t)\\|$ multiplicada por tiempo $dt$.',
    action: 'Antes de integrar, simplifica algebraicamente $\\|\\alpha\'(t)\\|$ usando identidades trigonométricas ($\\sin^2 t + \\cos^2 t = 1$) o cuadrados perfectos.',
    trap: 'Olvidar el factor jacobiano unidimensional $\\|\\alpha\'(t)\\|$ y sustituir erróneamente $ds$ por $dt$!'
  },
  {
    id: 't1-04',
    topic: 't1',
    symbol: '$\\int_C f\\,ds = \\int_a^b f(\\alpha(t))\\,\\|\\alpha\'(t)\\|\\,dt$',
    name: 'Integral de Línea de Primer Tipo (Campo Escalar)',
    reading: 'integral sobre la curva C de efe diferencial de longitud de arco',
    simple: 'Suma el valor de una función escalar $f$ (densidad de un alambre o altura de una valla/cortina) ponderada por cada milímetro real de curva.',
    action: 'Sigue 3 pasos: (1) parametriza $\\alpha(t)$, (2) sustituye $x(t),y(t),z(t)$ en $f$ y calcula $\\|\\alpha\'(t)\\|$, (3) evalúa la integral simple entre $a$ y $b$ ($a \\lt b$).',
    trap: 'Invertir los límites $a \\gt b$ haciendo salir negativa la masa o el área de una cortina (en integrales escalares SIEMPRE $a \\lt b$ porque $ds \\gt 0$).'
  },
  {
    id: 't1-05',
    topic: 't1',
    symbol: '$\\int_{-C} f\\,ds = +\\int_C f\\,ds$',
    name: 'Invariancia de la Integral Escalar ante Orientación',
    reading: 'la integral escalar sobre menos C es igual a la integral sobre C sin cambio de signo',
    simple: 'La masa de un alambre o el área de una cortina pintada NO depende de si caminas desde el extremo $A$ hacia $B$ o desde $B$ hacia $A$.',
    action: 'Recuerda que cualquier reparametrización biyectiva $C^1$ (creciente o decreciente) deja intacta a $\\int_C f\\,ds$ gracias al valor absoluto $|\\varphi\'(u)|$.',
    trap: 'Confundirla con la integral de campo vectorial $\\int_{-C} \\vec{F}\\cdot d\\vec{r} = -\\int_C \\vec{F}\\cdot d\\vec{r}$ (¡esa SÍ cambia de signo!).'
  },
  {
    id: 't1-06',
    topic: 't1',
    symbol: '$\\ell(C) = \\int_C 1\\,ds = \\int_a^b \\|\\alpha\'(t)\\|\\,dt$',
    name: 'Longitud de Arco de una Curva Rectificable',
    reading: 'longitud de la curva C igual a la integral de uno diferencial de ese',
    simple: 'Si la altura de la cortina es $f \\equiv 1$, el área de la cortina coincide numéricamente con el largo total de la curva estirada.',
    action: 'Úsala como verificación rápida: si $C$ es una circunferencia de radio $R$, $\\int_C 1\\,ds = 2\\pi R$; si es un segmento $PQ$, vale $\\|Q-P\\|$.',
    trap: 'Confundir la longitud recorrida con el desplazamiento neto $\\|\\alpha(b)-\\alpha(a)\\|$ (si la curva es cerrada, el desplazamiento es $0$ pero $\\ell(C) \\gt 0$).'
  },
  {
    id: 't1-07',
    topic: 't1',
    symbol: '$M = \\int_C \\rho(x,y,z)\\,ds$',
    name: 'Masa Total de un Alambre Delgado',
    reading: 'masa igual a la integral de línea de la densidad lineal rho diferencial de ese',
    simple: 'Multiplica la densidad lineal (kg/m) de cada pedacito del alambre por su longitud $ds$ y suma todo el cable.',
    action: 'Verifica siempre que $\\rho \\ge 0$ sobre $C$ y que el resultado final sea estrictamente positivo.',
    trap: 'Usar la densidad lineal en una integral doble o confundir el elemento $ds$ con $dx$.'
  },
  {
    id: 't1-08',
    topic: 't1',
    symbol: '$\\bar{x} = \\frac{1}{M}\\int_C x\\rho\\,ds,\\quad \\bar{y} = \\frac{1}{M}\\int_C y\\rho\\,ds,\\quad \\bar{z} = \\frac{1}{M}\\int_C z\\rho\\,ds$',
    name: 'Centro de Gravedad / Centroide de un Alambre',
    reading: 'equis barra igual a uno sobre la masa por la integral de equis por rho diferencial de ese',
    simple: 'Es el punto de equilibrio promedio ponderado por la masa del alambre; no tiene por qué caer encima del alambre (en un aro circular, está en el centro vacío!).',
    action: 'Aprovecha simetrías del alambre y de $\\rho$ antes de integrar: si $C$ y $\\rho$ son simétricos respecto al eje $Y$, entonces $\\bar{x} = 0$ automáticamente.',
    trap: 'Olvidar dividir entre la masa total $M$ (o la longitud $\\ell(C)$ si $\\rho$ es constante).'
  },
  {
    id: 't1-09',
    topic: 't1',
    symbol: '$A_{\\text{cortina}} = \\int_C f(x,y)\\,ds \\quad (f \\ge 0)$',
    name: 'Área de una Superficie Cilíndrica (Cortina Vertical)',
    reading: 'área de la cortina perpendicular al plano XY igual a la integral de línea de la altura efe diferencial de ese',
    simple: 'Levanta una pared vertical desde la curva $C$ en el piso hasta el techo $z = f(x,y)$; su área lateral es exactamente $\\int_C f\\,ds$.',
    action: 'Si el techo $z = f(x,y)$ toma valores negativos, integra $|f(x,y)|$ para obtener el área geométrica positiva.',
    trap: 'Confundir el área de la cortina vertical ($\\int_C f\\,ds$) con el volumen bajo la superficie ($\\iint_D f\\,dA$).'
  },
  {
    id: 't1-10',
    topic: 't1',
    symbol: '$\\beta(u) = (\\alpha \\circ \\varphi)(u), \\quad \\varphi : [c,d] \\to [a,b] \\text{ biyección } C^1$',
    name: 'Reparametrización Regular de una Curva',
    reading: 'beta de u igual a alfa compuesta con fi de u',
    simple: 'Recorrer la misma carretera a otra velocidad (o incluso en reversa si $\\varphi\' \\lt 0$). Si $\\varphi\' \\gt 0$ preserva la orientación; si $\\varphi\' \\lt 0$ la invierte.',
    action: 'En demostraciones de invariancia, aplica la regla de la cadena $\\beta\'(u) = \\alpha\'(\\varphi(u))\\varphi\'(u)$ y el cambio de variable $t = \\varphi(u)$.',
    trap: 'Olvidar el valor absoluto $|\\varphi\'(u)|$ al sacar $\\varphi\'(u)$ de la norma $\\|\\beta\'(u)\\| = \\|\\alpha\'(\\varphi(u))\\|\\,|\\varphi\'(u)|$.'
  },
  {
    id: 't1-11',
    topic: 't1',
    symbol: '$\\left|\\int_C f\\,ds\\right| \\le M\\,\\ell(C), \\quad M = \\sup_{p \\in C} |f(p)|$',
    name: 'Desigualdad de Acotación ML para Integrales Escalares',
    reading: 'valor absoluto de la integral sobre C menor o igual que la cota máxima M por la longitud de C',
    simple: 'Si la altura de la cortina nunca supera $M$ metros, su área jamás puede superar $M$ por el largo de su base.',
    action: 'Acota $|f(\\alpha(t))| \\le M$ usando desigualdades sobre la curva (ej. $x^2+y^2 = R^2$) y multiplica directamente por $\\ell(C)$.',
    trap: 'Acotar $f$ en todo $\\mathbb{R}^2$ (donde puede no estar acotada) en lugar de restringirla a los puntos que pertenecen a la curva $C$.'
  },

  // ==================== T2: INTEGRAL VECTORIAL Y TRABAJO (11) ====================
  {
    id: 't2-01',
    topic: 't2',
    symbol: '$\\vec{F} : U \\subseteq \\mathbb{R}^n \\to \\mathbb{R}^n, \\quad \\vec{F} = (P, Q, R)$',
    name: 'Campo Vectorial en $\\mathbb{R}^n$',
    reading: 'campo vectorial F con componentes escalares P, Q y R',
    simple: 'Asigna una flecha (fuerza, velocidad de fluido, campo eléctrico) a cada punto del espacio.',
    action: 'Identifica siempre el dominio abierto $U$ de continuidad/$C^1$ del campo (detecta denominadores que se anulan, logaritmos o raíces).',
    trap: 'Asumir que $\\vec{F}$ está definido en todo $\\mathbb{R}^2$ cuando tiene singularidades como $x^2+y^2=0$ en el denominador.'
  },
  {
    id: 't2-02',
    topic: 't2',
    symbol: '$\\int_C \\vec{F} \\cdot d\\vec{r} \\equiv \\int_C \\vec{F} \\cdot d\\alpha = \\int_a^b \\vec{F}(\\alpha(t)) \\cdot \\alpha\'(t)\\,dt$',
    name: 'Integral de Línea de Segundo Tipo (Campo Vectorial)',
    reading: 'integral sobre la curva C de F punto diferencial de erre igual a la integral de F en alfa de te punto alfa prima de te dt',
    simple: 'Mide cuánto «ayuda» (positivo) o «frena» (negativo) el campo de fuerzas a una partícula que recorre la trayectoria $C$ en su sentido elegido.',
    action: 'Calcula $\\alpha\'(t)$ (sin norma!), evalúa $\\vec{F}(\\alpha(t))$, realiza el producto escalar $\\vec{F}(\\alpha(t))\\cdot\\alpha\'(t)$ e integra desde el $t_{\\text{inicial}}$ hasta el $t_{\\text{final}}$.',
    trap: 'Tomar la norma $\\|\\alpha\'(t)\\|$ en lugar del vector $\\alpha\'(t)$ (en la integral vectorial NO hay raíz cuadrada!).'
  },
  {
    id: 't2-03',
    topic: 't2',
    symbol: '$\\int_C P\\,dx + Q\\,dy + R\\,dz$',
    name: 'Forma Diferencial de la Integral de Línea Vectorial',
    reading: 'integral sobre C de P diferencial de equis más Q diferencial de ye más R diferencial de zeta',
    simple: 'Es exactamente la misma integral $\\int_C \\vec{F}\\cdot d\\vec{r}$ desarrollada componente a componente con $d\\vec{r} = (dx, dy, dz)$.',
    action: 'Al sustituir $\\alpha(t)=(x(t),y(t),z(t))$, reemplaza $dx = x\'(t)\\,dt$, $dy = y\'(t)\\,dt$ y $dz = z\'(t)\\,dt$.',
    trap: 'Olvidar multiplicar cada componente por su derivada $x\'(t), y\'(t), z\'(t)$ o perder un signo menos de $P, Q, R$.'
  },
  {
    id: 't2-04',
    topic: 't2',
    symbol: '$\\int_C \\vec{F} \\cdot d\\vec{r} = \\int_C (\\vec{F} \\cdot \\vec{T})\\,ds$',
    name: 'Relación con el Vector Tangente Unitario $\\vec{T}$',
    reading: 'la integral vectorial equivale a la integral escalar de la componente tangencial F punto T diferencial de ese',
    simple: 'Solo la parte de la fuerza que empuja en la dirección tangente $\\vec{T}$ realiza trabajo; la componente perpendicular a la curva aporta $0$.',
    action: 'Si en un examen V/F te dicen que $\\vec{F}(\\alpha(t)) \\perp \\alpha\'(t)$ en todo punto (ángulo $\\pi/2$, PC6 2025-II #1a), concluye al instante que la integral es $0$!',
    trap: 'Si $\\Gamma$ es curva integral con $\\alpha\'(t) = \\vec{F}(\\alpha(t))$ (PC6 2025-II #1b), verifica el signo del ángulo ($\\vec{F}\\cdot\\vec{T} = +\\|\\vec{F}\\|$ solo si apuntan en el mismo sentido, no opuesto!).'
  },
  {
    id: 't2-05',
    topic: 't2',
    symbol: '$\\int_{-C} \\vec{F} \\cdot d\\vec{r} = -\\int_C \\vec{F} \\cdot d\\vec{r}$',
    name: 'Cambio de Signo bajo Inversión de Orientación',
    reading: 'la integral vectorial sobre la curva opuesta menos C es igual a menos la integral sobre C',
    simple: 'Si el viento te ayuda al ir de $A$ a $B$ (trabajo positivo), ese mismo viento te frenará exactamente en la misma magnitud al volver de $B$ a $A$.',
    action: 'En la prueba formal (PC6 2024-II #1a), usa $\\beta(u) = \\alpha(\\varphi(u))$ con $\\varphi(c)=b, \\varphi(d)=a$: al sustituir $t=\\varphi(u)$ los límites quedan $\\int_b^a = -\\int_a^b$.',
    trap: 'Cambiar el sentido de recorrido en una integral vectorial sin cambiar el signo del resultado.'
  },
  {
    id: 't2-06',
    topic: 't2',
    symbol: '$W = \\int_C \\vec{F} \\cdot d\\vec{r}$',
    name: 'Trabajo Mecánico Realizado por un Campo de Fuerzas',
    reading: 'trabajo W igual a la integral de línea del campo de fuerzas a lo largo de la trayectoria C',
    simple: 'Energía transferida a una partícula por la fuerza $\\vec{F}$ al moverse a lo largo de $C$.',
    action: 'Antes de parametrizar a fuerza bruta, verifica si $\\vec{F}$ es conservativo (si lo es, $W = \\varphi(B)-\\varphi(A)$) o si $C$ es cerrada en 2D (usa Green!).',
    trap: 'Asumir que todo trabajo alrededor de una curva cerrada es cero (solo vale $0$ para campos conservativos; en campos con rotacional o vórtices es $\\neq 0$).'
  },
  {
    id: 't2-07',
    topic: 't2',
    symbol: '$\\oint_C \\vec{F} \\cdot d\\vec{r}$',
    name: 'Circulación de un Campo Vectorial en Curva Cerrada',
    reading: 'integral cerrada sobre C de F punto diferencial de erre',
    simple: 'Mide la tendencia neta del fluido o campo a girar a lo largo del lazo cerrado $C$ (donde el punto inicial coincide con el final).',
    action: 'Especifica siempre la orientación del lazo (antihoraria/positiva o horaria/negativa vista desde $+Z$) antes de evaluar.',
    trap: 'Dar por sentado que una curva cerrada en el espacio tiene «orientación positiva» sin especificar desde qué semieje o normal se observa.'
  },
  {
    id: 't2-08',
    topic: 't2',
    symbol: '$\\left|\\int_C \\vec{F} \\cdot d\\vec{r}\\right| \\le M\\,\\ell(C), \\quad M = \\max_{p \\in C} \\|\\vec{F}(p)\\|$',
    name: 'Cota de Cauchy-Schwarz para Integrales Vectoriales',
    reading: 'valor absoluto de la integral vectorial menor o igual que el máximo de la norma de F por la longitud de la curva',
    simple: 'Por Cauchy-Schwarz, $|\\vec{F}\\cdot\\alpha\'| \\le \\|\\vec{F}\\|\\,\\|\\alpha\'\\| \\le M\\|\\alpha\'\\|$; al integrar aparece exactamente $M\\cdot\\ell(C)$ (pregunta clásica PC6 2024-II #3b!).',
    action: 'Escribe explícitamente la aplicación de Cauchy-Schwarz $|\\vec{F}(\\alpha(t))\\cdot\\alpha\'(t)| \\le \\|\\vec{F}(\\alpha(t))\\|\\,\\|\\alpha\'(t)\\|$ antes de sacar $M$ fuera de la integral.',
    trap: 'Aplicar la desigualdad directamente sobre las componentes sin pasar por la norma euclídea $\\|\\vec{F}\\|$.'
  },
  {
    id: 't2-09',
    topic: 't2',
    symbol: '$\\text{Flujo}_{2D} = \\oint_C \\vec{F} \\cdot \\vec{n}\\,ds = \\oint_C (P\\,dy - Q\\,dx)$',
    name: 'Integral de Flujo Saliente 2D a Través de una Curva Cerrada',
    reading: 'flujo igual a la integral de F punto el vector normal exterior n diferencial de ese igual a P dy menos Q dx',
    simple: 'Mide cuánta agua sale hacia afuera cruzando perpendicularmente la frontera $C$ de una tubería (PC6 2024-II #4a!), con normal exterior $\\vec{n} = (y\', -x\')/\\|\\alpha\'\\|$.',
    action: 'No confundas circulación ($P\\,dx + Q\\,dy$) con flujo ($P\\,dy - Q\\,dx$)! En 2D, por Green-Divergencia: $\\oint_C P\\,dy - Q\\,dx = \\iint_D (P_x + Q_y)\\,dA$.',
    trap: 'Calcular la circulación $\\oint P\\,dx + Q\\,dy$ cuando el enunciado pide explícitamente el FLUJO a través de $C$!'
  },
  {
    id: 't2-10',
    topic: 't2',
    symbol: '$\\int_{C_1 + C_2} \\vec{F} \\cdot d\\vec{r} = \\int_{C_1} \\vec{F} \\cdot d\\vec{r} + \\int_{C_2} \\vec{F} \\cdot d\\vec{r}$',
    name: 'Aditividad por Concatenación de Caminos',
    reading: 'integral sobre el camino concatenado C1 más C2 igual a la suma de las integrales',
    simple: 'El trabajo total de un viaje con escalas ($P \\to R \\to Q$) es la suma del trabajo de cada tramo individual.',
    action: 'Úsala tanto para contornos poligonales como para cerrar curvas abiertas añadiendo un segmento auxiliar antes de aplicar el Teorema de Green.',
    trap: 'Olvidar restar la integral del segmento auxiliar que añadiste para cerrar la curva al usar Green.'
  },
  {
    id: 't2-11',
    topic: 't2',
    symbol: '$\\alpha\'(t) = \\vec{F}(\\alpha(t))$',
    name: 'Curva Integral (Línea de Flujo) de un Campo',
    reading: 'alfa prima de te igual a F evaluado en alfa de te',
    simple: 'Una trayectoria que en cada instante se mueve exactamente en la dirección y rapidez que dicta el campo vectorial (como una hoja arrastrada por un río).',
    action: 'Si $\\Gamma$ es curva integral de $\\vec{F}$, entonces $\\vec{F}(\\alpha(t)) \\cdot \\alpha\'(t) = \\|\\vec{F}(\\alpha(t))\\|^2 = \\|\\vec{F}(\\alpha(t))\\|\\,\\|\\alpha\'(t)\\|$, luego $\\int_\\Gamma \\vec{F}\\cdot d\\alpha = \\int_\\Gamma \\|\\vec{F}\\|\\,ds$ (PC6 2025-II #1b!).',
    trap: 'Suponer que $\\vec{F}$ y $\\alpha\'$ solo son paralelos (si fueran antiparalelos $\\alpha\' = -\\vec{F}$, aparecería un signo menos).'
  },

  // ==================== T3: CONVEXOS Y CAMPOS GRADIENTES (11) ====================
  {
    id: 't3-01',
    topic: 't3',
    symbol: '$\\forall x, y \\in U,\\; \\forall t \\in [0,1] : (1-t)x + t y \\in U$',
    name: 'Conjunto Convexo (Sesión 33)',
    reading: 'para todo par de puntos x, y en U, el segmento recto que los une está completamente contenido en U',
    simple: 'Una habitación sin esquinas entrantes ni columnas interiores: desde cualquier punto puedes ver a cualquier otro en línea recta sin chocar con paredes.',
    action: 'Verifica convexidad cuando necesites aplicar el teorema suficiente de campos gradientes en $\\mathbb{R}^n$ (bolas abiertas, rectángulos, semiplanos y todo $\\mathbb{R}^n$ son convexos).',
    trap: 'Afirmar que $\\mathbb{R}^2 \\setminus \\{(0,0)\\}$ es convexo (falso: el segmento entre $(-1,0)$ y $(1,0)$ pasa por el origen excluido).'
  },
  {
    id: 't3-02',
    topic: 't3',
    symbol: '$\\exists x_0 \\in U : \\forall x \\in U,\\; [x_0, x] \\subseteq U$',
    name: 'Conjunto Estrellado respecto a $x_0$',
    reading: 'existe un centro x sub cero tal que el segmento hacia todo punto de U permanece dentro de U',
    simple: 'Más general que convexo: basta un solo punto privilegiado $x_0$ desde el cual se vea toda la habitación en línea recta (ej. el plano cortado $\\mathbb{R}^2 \\setminus \\{(x,0) : x \\le 0\\}$ es estrellado respecto a $(1,0)$).',
    action: 'Recuerda que el Lema de Poincaré (irrotacional $\\implies$ conservativo) vale en todo abierto estrellado (y en particular en todo abierto convexo).',
    trap: 'Creer que todo conjunto estrellado es convexo (falso: una estrella de 5 puntas es estrellada pero no convexa).'
  },
  {
    id: 't3-03',
    topic: 't3',
    symbol: '$\\vec{F} = \\nabla \\varphi \\iff F_i = \\frac{\\partial \\varphi}{\\partial x_i},\\; i = 1,\\dots,n$',
    name: 'Campo Gradiente (Campo Conservativo)',
    reading: 'F es igual al gradiente de una función escalar fi',
    simple: 'El campo de flechas no es arbitrario: representa exactamente la máxima pendiente cuesta arriba de una «montaña escalar» $\\varphi$ (llamada función potencial).',
    action: 'Para demostrar que $\\vec{F}$ es conservativo en CUALQUIER dominio (incluso con agujeros!), el camino más contundente es exhibir explícitamente $\\varphi$ y verificar $\\nabla\\varphi = \\vec{F}$.',
    trap: 'Olvidar que en física suele escribirse $\\vec{F} = -\\nabla U$ (con signo menos para energía potencial), mientras en matemática CM2A1 se usa $\\vec{F} = +\\nabla\\varphi$.'
  },
  {
    id: 't3-04',
    topic: 't3',
    symbol: '$\\frac{\\partial F_i}{\\partial x_j} = \\frac{\\partial F_j}{\\partial x_i}, \\quad \\forall i, j \\in \\{1,\\dots,n\\}$',
    name: 'Condición Necesaria de Simetría de Derivadas Cruzadas (Schwarz)',
    reading: 'parcial de F sub i respecto a equis sub j igual a parcial de F sub j respecto a equis sub i',
    simple: 'Si $\\vec{F} = \\nabla\\varphi$ con $\\vec{F} \\in C^1$, las derivadas cruzadas de $\\vec{F}$ son las segundas derivadas mixtas de $\\varphi$, que deben coincidir por el Teorema de Schwarz.',
    action: 'En $\\mathbb{R}^2$, revisa $P_y = Q_x$. En $\\mathbb{R}^3$, revisa las 3 igualdades: $P_y = Q_x$, $P_z = R_x$ y $Q_z = R_y$. Si UNA sola falla, $\\vec{F}$ NO es conservativo!',
    trap: 'Usar esta condición como si fuera SUFICIENTE en cualquier dominio sin verificar topología (PC6 2025-I #1b: FALSO sin dominio simplemente conexo/convexo!).'
  },
  {
    id: 't3-05',
    topic: 't3',
    symbol: '$\\operatorname{rot}\\vec{F} = \\nabla \\times \\vec{F} = (R_y - Q_z,\\; P_z - R_x,\\; Q_x - P_y)$',
    name: 'Rotacional de un Campo Vectorial en $\\mathbb{R}^3$',
    reading: 'rotacional de F igual a nabla cruz F',
    simple: 'Mide la rotación microscópica (remolino) del campo en cada punto. Que $\\operatorname{rot}\\vec{F} = \\vec{0}$ equivale exactamente a la igualdad de las 3 derivadas cruzadas.',
    action: 'Para hallar constantes desconocidas $(m,n,p,r)$ sabiendo que $\\vec{F}$ es conservativo (PC6 2026-I #1b), iguala cada componente de $\\operatorname{rot}\\vec{F}$ a $0$ término a término.',
    trap: 'Equivocar el signo de la segunda componente del determinante $3\\times 3$: es $-(R_x - P_z) = P_z - R_x$.'
  },
  {
    id: 't3-06',
    topic: 't3',
    symbol: '$\\operatorname{rot}_{2D}\\vec{F} = \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}$',
    name: 'Rotacional Escalar 2D (Integrando de Green)',
    reading: 'parcial de Q respecto a equis menos parcial de P respecto a ye',
    simple: 'Imagina poner una ruedita de molino en el punto $(x,y)$: si gira antihorario, $Q_x - P_y \\gt 0$; si gira horario, $\\lt 0$; si no gira, el campo es irrotacional ($=0$).',
    action: 'Memoriza el orden: «derivada de la segunda ($Q$) respecto a la primera ($x$) MENOS derivada de la primera ($P$) respecto a la segunda ($y$)».',
    trap: 'Invertir el orden escribiendo $P_y - Q_x$, lo cual cambia el signo de toda la integral de Green!'
  },
  {
    id: 't3-07',
    topic: 't3',
    symbol: '$U \\text{ abierto convexo} + \\vec{F} \\in C^1(U) + \\frac{\\partial F_i}{\\partial x_j} = \\frac{\\partial F_j}{\\partial x_i} \\implies \\vec{F} = \\nabla\\varphi$',
    name: 'Condición Suficiente en Dominio Convexo (Lema de Poincaré)',
    reading: 'si el dominio es abierto convexo y las derivadas cruzadas coinciden, entonces F es un campo gradiente',
    simple: 'Sin agujeros que estorben, la ausencia de remolinos locales ($\\operatorname{rot}\\vec{F}=\\vec{0}$) garantiza que existe un potencial global bien definido.',
    action: 'En tu hoja de examen, menciona SIEMPRE las 3 condiciones juntas: (1) $\\vec{F} \\in C^1(U)$, (2) derivadas cruzadas iguales, (3) $U$ es convexo / simplemente conexo.',
    trap: 'Decir «como $U$ no es convexo, entonces $\\vec{F}$ NO es conservativo» (¡error lógico grave! El teorema es condición SUFICIENTE, no necesaria; ver PC6 2025-II #4).'
  },
  {
    id: 't3-08',
    topic: 't3',
    symbol: '$\\varphi(x) = \\int_0^1 \\vec{F}(x_0 + t(x - x_0)) \\cdot (x - x_0)\\,dt$',
    name: 'Fórmula Constructiva de Poincaré en Estrellados/Convexos',
    reading: 'potencial fi de equis como integral radial desde el centro equis sub cero hasta equis',
    simple: 'Construye el potencial integrando el campo a lo largo del segmento recto que une el centro fijo $x_0$ con el punto variable $x$.',
    action: 'Muy útil en demostraciones teóricas de existencia de potencial en convexos/estrellados; en cálculos operativos suele ser más rápida la integración parcial componente a componente.',
    trap: 'Usar $x_0 = (0,0)$ cuando $(0,0)$ no pertenece al dominio $U$ (elige un punto base $x_0 \\in U$!).'
  },
  {
    id: 't3-09',
    topic: 't3',
    symbol: '$U \\subset \\mathbb{R}^n \\text{ abierto y conexo}$',
    name: 'Dominio Abierto Conexo (Región)',
    reading: 'U subconjunto abierto y conexo de erre a la ene',
    simple: 'Un conjunto de una sola pieza (en abiertos de $\\mathbb{R}^n$, conexo equivale a conexo por caminos poligonales). Garantiza que si $\\nabla\\varphi = \\vec{0}$, entonces $\\varphi$ es constante.',
    action: 'Si dos potenciales $\\varphi_1, \\varphi_2$ satisfacen $\\nabla\\varphi_1 = \\nabla\\varphi_2 = \\vec{F}$ en un dominio conexo $U$, concluye que difieren en una única constante $\\varphi_1 - \\varphi_2 = C$.',
    trap: 'Olvidar que en un conjunto disconexo $U = U_1 \\cup U_2$, la constante $C$ puede tomar valores distintos en cada componente.'
  },
  {
    id: 't3-10',
    topic: 't3',
    symbol: '$\\vec{F}(\\vec{r}) = g(\\|\\vec{r}\\|)\\,\\vec{r}$',
    name: 'Campo Radial (Central) en $\\mathbb{R}^n \\setminus \\{\\vec{0}\\}$',
    reading: 'campo radial igual a una función escalar de la distancia multiplicada por el vector posición',
    simple: 'Todo campo que apunta puramente hacia afuera o hacia adentro del origen y cuya intensidad solo depende de la distancia $r = \\|\\vec{r}\\|$ (como gravedad y Coulomb) es conservativo!',
    action: 'Su potencial explícito es inmediato: $\\varphi(\\vec{r}) = G(\\|\\vec{r}\\|)$ donde $G\'(r) = r\\,g(r)$. Por ejemplo, para $\\frac{2\\vec{r}}{r^2}$, $G\'(r) = 2/r \\implies \\varphi = \\ln(x^2+y^2)$!',
    trap: 'Creer que el campo $\\left(\\frac{2x}{x^2+y^2}, \\frac{2y}{x^2+y^2}\\right)$ no es conservativo por tener denominador $x^2+y^2$ (confundiéndolo con el vórtice $(-y,x)/(x^2+y^2)$!).'
  },
  {
    id: 't3-11',
    topic: 't3',
    symbol: '$\\operatorname{Jac}(\\vec{F}) = [\\operatorname{Jac}(\\vec{F})]^T$',
    name: 'Matriz Jacobiana Simétrica (Campo Cerrado)',
    reading: 'la matriz jacobiana del campo vectorial F es igual a su transpuesta',
    simple: 'Forma matricial compacta de decir que todas las derivadas parciales cruzadas coinciden en $\\mathbb{R}^n$: si $\\vec{F}=\\nabla\\varphi$, su jacobiana es la matriz Hessiana $H\\varphi$, que es simétrica.',
    action: 'En dimensiones $n \\ge 4$, escribe $D\\vec{F}(x)$ y verifica simetría respecto a la diagonal principal.',
    trap: 'Igualar los elementos diagonales $\\partial F_i / \\partial x_i$ (la diagonal puede ser cualquiera; solo los elementos fuera de la diagonal deben coincidir en pares).'
  },

  // ==================== T4: INDEPENDENCIA DEL CAMINO, POTENCIALES Y VÓRTICE (11) ====================
  {
    id: 't4-01',
    topic: 't4',
    symbol: '$\\int_C \\nabla \\varphi \\cdot d\\vec{r} = \\varphi(\\alpha(b)) - \\varphi(\\alpha(a))$',
    name: 'Teorema Fundamental de las Integrales de Línea (TFIL)',
    reading: 'la integral de línea de un campo gradiente es igual al potencial en el punto final menos el potencial en el punto inicial',
    simple: 'Al escalar una montaña, el cambio total de altitud solo depende de dónde empezaste y dónde terminaste, sin importar cuántos rodeos diste.',
    action: 'En la demostración (PC6 2024-II #3a), define $h(t) = \\varphi(\\alpha(t))$, deriva por regla de la cadena $h\'(t) = \\nabla\\varphi(\\alpha(t))\\cdot\\alpha\'(t)$ y aplica el TFC de 1 variable.',
    trap: 'Evaluar al revés $\\varphi(A) - \\varphi(B)$ (siempre es FINAL menos INICIAL) o aplicarlo a un campo que NO es gradiente.'
  },
  {
    id: 't4-02',
    topic: 't4',
    symbol: '$\\vec{F} = \\nabla\\varphi \\iff \\text{Indep. del camino} \\iff \\oint_C \\vec{F}\\cdot d\\vec{r} = 0\\; (\\forall C \\text{ cerrada})$',
    name: 'Triángulo de Equivalencias de Campos Conservativos (Sesión 34)',
    reading: 'F es campo gradiente si y solo si su integral es independiente del camino, si y solo si su circulación es cero en toda curva cerrada regular a trozos',
    simple: 'Tres caras de la misma moneda en todo abierto conexo $U$: no requieren que $U$ sea convexo ni simplemente conexo!',
    action: 'Si te piden probar que $\\vec{F}$ NO es conservativo, basta encontrar UNA sola curva cerrada donde $\\oint_C \\vec{F}\\cdot d\\vec{r} \\neq 0$, o DOS caminos entre $A$ y $B$ que den valores distintos.',
    trap: 'Verificar $\\oint_{C_r} \\vec{F}\\cdot d\\vec{r} = 0$ SOLO en circunferencias centradas en el origen y concluir que es conservativo (PC6 2024-II #1b: FALSO! Debe valer para TODA curva cerrada!).'
  },
  {
    id: 't4-03',
    topic: 't4',
    symbol: '$\\varphi(x,y) = \\int P(x,y)\\,dx + g(y), \\qquad \\varphi_y = Q(x,y)$',
    name: 'Método de Integración Parcial para Construir el Potencial',
    reading: 'integrar P respecto a equis sumando una función arbitraria g de ye, luego derivar respecto a ye e igualar a Q',
    simple: 'Es un rompecabezas de 3 pasos para reconstruir la «montaña» $\\varphi$ a partir de sus pendientes parciales $(P, Q, R)$.',
    action: 'Paso 1: integra $P$ en $x$ añadiendo $+g(y)$ (o $+g(y,z)$ en 3D). Paso 2: deriva en $y$ e iguala a $Q$ (todas las $x$ DEBEN cancelarse!). Paso 3: integra $g\'(y)$ y repite para $z$ si es 3D.',
    trap: 'Si al despejar $g\'(y)$ todavía sobrevive alguna $x$, ¡detente! O cometiste un error de álgebra o el campo NO es conservativo.'
  },
  {
    id: 't4-04',
    topic: 't4',
    symbol: '$\\vec{V}(x,y) = \\left( \\frac{-y}{x^2+y^2}, \\; \\frac{x}{x^2+y^2} \\right)$',
    name: 'Campo del Vórtice Irrotacional (Contraejemplo Maestro)',
    reading: 'campo del vórtice menos ye entre equis cuadrado más ye cuadrado coma equis entre equis cuadrado más ye cuadrado',
    simple: 'El ejemplo más famoso de Cálculo Vectorial: cumple $Q_x = P_y$ en todo $\\mathbb{R}^2 \\setminus \\{(0,0)\\}$, pero al dar una vuelta antihoraria alrededor del origen su integral vale $2\\pi \\neq 0$!',
    action: 'Reconócelo al instante dentro de expresiones complicadas (a veces disfrazado con un factor $k$ o trasladado a $(x-a, y-b)$): su circulación alrededor de la singularidad es $2\\pi k$.',
    trap: 'Aplicar el Teorema de Green ingenuamente diciendo $\\iint_D (Q_x - P_y)\\,dA = 0$ sobre un disco que contiene al origen $(0,0)$!'
  },
  {
    id: 't4-05',
    topic: 't4',
    symbol: '$\\theta(x,y) = \\arctan\\left(\\frac{y}{x}\\right) \\quad (\\text{local, multivaluado en } \\mathbb{R}^2\\setminus\\{(0,0)\\})$',
    name: 'Potencial Local Angular del Vórtice',
    reading: 'ángulo polar theta como función potencial local del campo vórtice',
    simple: 'Localmente (en cualquier abierto que NO rodee el origen, como $x \\gt 0$), $\\vec{V} = \\nabla\\theta$ es un gradiente perfecto; pero al dar una vuelta completa al origen, $\\theta$ salta de $0$ a $2\\pi$ como una escalera de caracol!',
    action: 'Si una curva abierta $C$ permanece en el semiplano $x \\gt 0$ (o no cruza un rayo de corte), puedes evaluar $\\int_C \\vec{V}\\cdot d\\vec{r} = \\theta(B) - \\theta(A)$ directamente.',
    trap: 'Escribir $\\varphi(x,y) = \\arctan(y/x)$ como «potencial global en $\\mathbb{R}^2\\setminus\\{(0,0)\\}$» (no está definido ni es continuo en $x = 0$!).'
  },
  {
    id: 't4-06',
    topic: 't4',
    symbol: '$U \\text{ simplemente conexo}$',
    name: 'Dominio Simplemente Conexo en $\\mathbb{R}^2$',
    reading: 'conjunto abierto U simplemente conexo',
    simple: 'Es conexo y NO tiene agujeros: cualquier banda elástica cerrada (curva cerrada simple) dentro de $U$ puede encogerse continuamente a un punto sin salirse de $U$.',
    action: 'En $\\mathbb{R}^2$, recuerda la jerarquía estricta: $\\text{Convexo} \\implies \\text{Estrellado} \\implies \\text{Simplemente Conexo} \\implies \\text{Conexo}$.',
    trap: 'En $\\mathbb{R}^3$, ¡$\mathbb{R}^3 \\setminus \\{(0,0,0)\\}$ SÍ es simplemente conexo (puedes deslizar el lazo por encima del punto), mientras $\\mathbb{R}^3 \\setminus \\{\\text{eje } Z\\}$ NO lo es!'
  },
  {
    id: 't4-07',
    topic: 't4',
    symbol: '$C_k = \\{(x,y) : f(x,y) = k\\}$',
    name: 'Curvas de Nivel y Mapas de Contorno (PC6 2025-II #2)',
    reading: 'curva de nivel k de la función potencial efe',
    simple: 'Son líneas de altitud constante en un mapa topográfico: si una curva $C$ empieza en la curva de nivel $10$ y termina en la curva de nivel $50$, $\\int_C \\nabla f\\cdot d\\vec{r} = 50 - 10 = 40$ sin conocer la fórmula de $f$!',
    action: 'Para diseñar una curva abierta $C_4$ con $\\int_{C_4} \\nabla f\\cdot d\\vec{r} = 0$, basta hacer que su punto inicial y su punto final caigan sobre la MISMA curva de nivel!',
    trap: 'Pensar que una curva con integral cero de $\\nabla f$ debe ser obligatoriamente cerrada (basta que empiece y termine en dos puntos distintos del mismo nivel).'
  },
  {
    id: 't4-08',
    topic: 't4',
    symbol: '$\\vec{F} = \\vec{F}_{\\text{cons}} + \\vec{F}_{\\text{no cons}}$',
    name: 'Descomposición Aditiva de un Campo Vectorial',
    reading: 'separación de F en una parte conservativa más una parte no conservativa o singular',
    simple: 'Estrategia maestra en exámenes UNI: separa los términos complicados que ya son derivadas exactas (cuya integral en curva cerrada es $0$) y quédate solo con la parte simple o el vórtice!',
    action: 'Ante campos monstruosos como $(e^{\\sin x} - y^2,\\; \\arctan y)$ en una curva cerrada (PC6 2024-II #4b), observa que $(e^{\\sin x}, \\arctan y) = \\nabla\\varphi$ aporta $0$ y solo integra $(-y^2, 0)$!',
    trap: 'Intentar parametrizar $e^{\\sin(x(t))}$ directamente perdiendo 30 minutos de examen cuando su integral en un lazo cerrado es exactamente $0$.'
  },
  {
    id: 't4-09',
    topic: 't4',
    symbol: '$\\operatorname{Ind}(C, p_0) = \\frac{1}{2\\pi}\\oint_C \\frac{-(y-y_0)\\,dx + (x-x_0)\\,dy}{(x-x_0)^2 + (y-y_0)^2}$',
    name: 'Número de Vueltas (Índice de Enrollamiento)',
    reading: 'índice de la curva C respecto al punto p sub cero',
    simple: 'Cuenta cuántas vueltas completas antihorarias ($+1$) u horarias ($-1$) da la curva $C$ alrededor del punto singular $p_0$; siempre es un número entero!',
    action: 'Si $C$ da una vuelta positiva alrededor de $p_0$, la integral del vórtice centrado en $p_0$ vale $+2\\pi$; si no lo encierra, vale $0$; si da $n$ vueltas, vale $2\\pi n$.',
    trap: 'Olvidar revisar si el punto singular $p_0 = (x_0, y_0)$ queda DENTRO o FUERA de la elipse/curva $C$ antes de concluir $2\\pi$ o $0$.'
  },
  {
    id: 't4-10',
    topic: 't4',
    symbol: '$\\vec{F}(x,y) = (xy, x^2) \\implies \\oint_{C_r} \\vec{F}\\cdot d\\alpha = 0\\; (\\forall r \\gt 0)$',
    name: 'Contraejemplo de Circulación Nula Solo en Círculos (PC6 2024-II #1b)',
    reading: 'campo xy coma x cuadrado con circulación nula en todo círculo centrado en el origen pero no conservativo',
    simple: 'Muestra que anular la integral solo en una familia particular de curvas cerradas (los círculos $C_r$) NO alcanza para ser conservativo, pues $Q_x - P_y = x \\neq 0$.',
    action: 'Cítalo de memoria si te preguntan en V/F si $\\oint_{C_r} \\vec{F}\\cdot d\\alpha = 0\\; \\forall r \\gt 0$ implica que $\\vec{F}$ es conservativo.',
    trap: 'Confundir «para TODA curva cerrada $C$ en $U$» con «para toda circunferencia centrada en el origen $C_r$».'
  },
  {
    id: 't4-11',
    topic: 't4',
    symbol: '$\\vec{F}(x,y) = \\left(\\frac{2x}{x^2+y^2} + 3x^2y,\\; \\frac{2y}{x^2+y^2} + x^3 - 2y\\right)$',
    name: 'Campo Conservativo en Dominio Perforado (PC6 2025-II #4)',
    reading: 'campo conservativo con potencial logarítmico en erre dos menos el origen',
    simple: 'Aunque su dominio $D = \\mathbb{R}^2 \\setminus \\{(0,0)\\}$ tiene un agujero, SÍ es conservativo porque admite el potencial global $\\varphi(x,y) = \\ln(x^2+y^2) + x^3 y - y^2$.',
    action: 'Cuando $Q_x = P_y$ en un dominio con agujero, NO digas automáticamente que no es conservativo: intenta hallar $\\varphi$ o calcula la circulación alrededor del agujero!',
    trap: 'Caer en la falacia inversa: «dominio no simplemente conexo $\\implies$ no conservativo» (¡FALSO!).'
  },

  // ==================== T5: TEOREMA DE GREEN (11) ====================
  {
    id: 't5-01',
    topic: 't5',
    symbol: '$\\oint_{\\partial D^+} (P\\,dx + Q\\,dy) = \\iint_D \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right) dA$',
    name: 'Teorema de Green en Región Simplemente Conexa',
    reading: 'integral cerrada en sentido positivo sobre la frontera de D de P dx más Q dy igual a la integral doble sobre D de Q sub x menos P sub y dA',
    simple: 'Conecta el borde con el interior: la circulación total a lo largo del perímetro $\\partial D^+$ es exactamente la suma de todos los pequeños remolinos $Q_x - P_y$ que hay adentro.',
    action: 'Verifica las 3 hipótesis en tu hoja: (1) $\\partial D$ curva cerrada simple regular a trozos orientada positivamente, (2) $P, Q \\in C^1(U)$ en un abierto $U$ que contiene a $D \\cup \\partial D$ (¡NO solo a $\\partial D$!).',
    trap: 'Aplicar Green cuando $\\vec{F}$ tiene una singularidad dentro de $D$ (PC6 2024-II #1c: $U$ debe contener a TODA la región $D$, no únicamente a la frontera $C$!).'
  },
  {
    id: 't5-02',
    topic: 't5',
    symbol: '$\\partial D^+ \\text{ (Región } D \\text{ siempre a la izquierda)}$',
    name: 'Orientación Positiva de la Frontera',
    reading: 'frontera de D orientada positivamente',
    simple: 'Imagina caminar por la cerca del parque: la orientación es positiva si el césped (la región $D$) queda siempre a tu mano IZQUIERDA. Eso implica antihorario en el borde exterior y horario en los agujeros interiores!',
    action: 'Si el enunciado da la curva en sentido HORARIO (negativo), aplica Green con un signo menos explícito delante: $\\oint_{\\partial D^-} = -\\iint_D (Q_x - P_y)\\,dA$.',
    trap: 'Orientar los agujeros interiores en sentido antihorario (eso deja el dominio $D$ a la derecha, invirtiendo el signo!).'
  },
  {
    id: 't5-03',
    topic: 't5',
    symbol: '$\\oint_{C_{\\text{ext}}^+} \\vec{F}\\cdot d\\vec{r} + \\sum_{k=1}^m \\oint_{C_k^-} \\vec{F}\\cdot d\\vec{r} = \\iint_D (Q_x - P_y)\\,dA$',
    name: 'Teorema de Green en Regiones Múltiplemente Conexas (Con Agujeros)',
    reading: 'circulación exterior antihoraria más circulaciones interiores horarias igual a la integral doble del rotacional sobre la región perforada',
    simple: 'Se hacen cortes rectos que conectan el borde exterior con cada agujero convirtiendo la región en trozos simplemente conexos; los cortes se recorren ida y vuelta y se cancelan exactamente!',
    action: 'Si hay una singularidad en $p_0 \\in D$, rodea $p_0$ con una circunferencia diminuta $C_\\varepsilon$ (con $C_\\varepsilon^+$ antihorario) y escribe $\\oint_{C_{\\text{ext}}^+} - \\oint_{C_\\varepsilon^+} = \\iint_{D\\setminus B_\\varepsilon} (Q_x - P_y)\\,dA$.',
    trap: 'Sumar $\\oint_{C_\\varepsilon^+}$ en lugar de restarlo cuando ambos contornos están orientados en sentido antihorario.'
  },
  {
    id: 't5-04',
    topic: 't5',
    symbol: '$Q_x - P_y = 0 \\text{ en } D \\setminus \\{p_0\\} \\implies \\oint_{C^+} \\vec{F}\\cdot d\\vec{r} = \\oint_{C_\\varepsilon^+} \\vec{F}\\cdot d\\vec{r}$',
    name: 'Principio de Deformación de Contornos (Invariancia Homológica)',
    reading: 'si el rotacional se anula entre dos curvas cerradas, ambas tienen exactamente la misma circulación',
    simple: 'Si una curva fea (elipse, cuadrado, estrella) encierra una singularidad donde $Q_x = P_y$ afuera, puedes deformarla suavemente a un círculo diminuto $C_\\varepsilon$ fácil de parametrizar sin cambiar el valor de la integral!',
    action: 'Truco estrella PC6: en lugar de parametrizar un cuadrado o una elipse alrededor del origen para un campo tipo vórtice, deforma a $C_\\varepsilon : x^2+y^2=\\varepsilon^2$ (o a la elipse que iguala el denominador!).',
    trap: 'Olvidar comprobar que $Q_x - P_y = 0$ en la región anular entre $C$ y $C_\\varepsilon$, o que no haya otra singularidad atrapada entre ambas curvas.'
  },
  {
    id: 't5-05',
    topic: 't5',
    symbol: '$\\operatorname{Area}(D) = \\oint_{\\partial D^+} x\\,dy = -\\oint_{\\partial D^+} y\\,dx = \\frac{1}{2}\\oint_{\\partial D^+} (x\\,dy - y\\,dx)$',
    name: 'Fórmulas de Área Plana mediante el Teorema de Green',
    reading: 'área de D igual a un medio de la integral cerrada positiva de x dy menos y dx',
    simple: 'Si eliges $(P,Q) = (-y/2, x/2)$, su rotacional es $Q_x - P_y = 1/2 - (-1/2) = 1$, convirtiendo $\\iint_D 1\\,dA$ en una integral simple sobre el contorno!',
    action: 'Para curvas parametrizadas simétricas (elipse, astroide $x=a\\cos^3 t, y=a\\sin^3 t$, folio de Descartes), la forma simétrica $\\frac{1}{2}\\oint (x\\,dy - y\\,dx)$ cancela términos y simplifica radicalmente el álgebra.',
    trap: 'Olvidar el factor $\\frac{1}{2}$ en la fórmula simétrica o recorrer el parámetro en sentido horario (obteniendo área negativa).'
  },
  {
    id: 't5-06',
    topic: 't5',
    symbol: '$\\bar{x} = \\frac{1}{2A}\\oint_{\\partial D^+} x^2\\,dy, \\qquad \\bar{y} = -\\frac{1}{2A}\\oint_{\\partial D^+} y^2\\,dx$',
    name: 'Centroide de una Región Plana por Green (PC6 2026-I #3)',
    reading: 'equis barra igual a uno sobre dos A por la integral cerrada de equis cuadrado dy',
    simple: 'Eligiendo $P=0, Q=x^2/2$ obtenemos $Q_x - P_y = x$, así que $\\iint_D x\\,dA = \\frac{1}{2}\\oint_{\\partial D^+} x^2\\,dy$ sin necesidad de integrar en 2D!',
    action: 'Para demostrar fórmulas de centroide o momentos de inercia con Green, busca un campo $(P,Q)$ cuyo rotacional $Q_x - P_y$ sea exactamente el integrando deseado ($x$, $y$, $x^2$, etc.).',
    trap: 'Olvidar el signo negativo en la fórmula de $\\bar{y}$ (porque con $P = -y^2/2, Q = 0$, se obtiene $Q_x - P_y = +y$).'
  },
  {
    id: 't5-07',
    topic: 't5',
    symbol: '$\\oint_{\\partial D^+} \\vec{F}\\cdot\\vec{n}\\,ds = \\oint_{\\partial D^+} (P\\,dy - Q\\,dx) = \\iint_D \\left(\\frac{\\partial P}{\\partial x} + \\frac{\\partial Q}{\\partial y}\\right) dA$',
    name: 'Forma Vectorial de Divergencia (Flujo) del Teorema de Green',
    reading: 'flujo saliente a través de la frontera igual a la integral doble de la divergencia de F sobre D',
    simple: 'Es el Teorema de Gauss en 2D: el fluido total que escapa por el borde es la suma de todas las fuentes ($\\operatorname{div}\\vec{F} \\gt 0$) menos sumideros ($\\operatorname{div}\\vec{F} \\lt 0$) interiores.',
    action: 'Aplícala cuando pidan flujo a través de una curva cerrada 2D (como PC6 2024-II #4a: para $\\vec{F}=(-y,x)$, $\\operatorname{div}\\vec{F} = 0 + 0 = 0 \\implies$ flujo neto $= 0$ al instante!).',
    trap: 'Confundir divergencia $P_x + Q_y$ (flujo) con rotacional $Q_x - P_y$ (circulación).'
  },
  {
    id: 't5-08',
    topic: 't5',
    symbol: '$\\oint_{\\partial D^+} \\frac{\\partial u}{\\partial n}\\,ds = \\iint_D \\Delta u\\,dA$',
    name: 'Primera Identidad de Green (Laplaciano $\\Delta u = u_{xx} + u_{yy}$)',
    reading: 'integral sobre el borde de la derivada normal de u igual a la integral doble del laplaciano de u',
    simple: 'Aplicando Green-Divergencia al gradiente $\\vec{F} = \\nabla u$, el flujo del gradiente equivale a la integral del Laplaciano; si $u$ es armónica ($\\Delta u = 0$), el flujo total por cualquier borde cerrado es $0$!',
    action: 'Úsala en problemas teóricos de Nivel 4–5 con funciones armónicas ($u_{xx} + u_{yy} = 0$) o para probar unicidad de soluciones de Laplace.',
    trap: 'Olvidar que $\\frac{\\partial u}{\\partial n} = \\nabla u \\cdot \\vec{n}$ y que $u$ debe ser de clase $C^2$ en un abierto que contenga a $\\overline{D}$.'
  },
  {
    id: 't5-09',
    topic: 't5',
    symbol: '$\\int_{C_{\\text{abierta}}} P\\,dx + Q\\,dy = \\iint_D (Q_x - P_y)\\,dA - \\int_{L_{\\text{cierre}}} P\\,dx + Q\\,dy$',
    name: 'Técnica de Cierre de Curva Abierta con Green',
    reading: 'integral sobre curva abierta igual a integral doble de Green menos la integral sobre el segmento de cierre',
    simple: 'Cuando una curva abierta es horrible de parametrizar (ej. media cicloide o un arco complicado) pero $Q_x - P_y$ es sencillísimo, ciérrala con un segmento recto $L$ fácil de integrar y aplica Green!',
    action: 'Dibuja flechas claras para que $C_{\\text{abierta}} \\cup L_{\\text{cierre}}$ forme un lazo cerrado simple orientado positivamente, y NO olvides restar $\\int_{L_{\\text{cierre}}}$.',
    trap: 'Olvidar restar la integral del segmento auxiliar $L$ o equivocar la orientación con que se recorre $L$.'
  },
  {
    id: 't5-10',
    topic: 't5',
    symbol: '$\\frac{1}{2}\\oint_C (x\\,dy - y\\,dx) = \\frac{1}{2}\\int_\\alpha^\\beta r(\\theta)^2\\,d\\theta$',
    name: 'Conexión de Green con el Área en Coordenadas Polares',
    reading: 'la fórmula de área de Green en polares recupera un medio de la integral de erre cuadrado d theta',
    simple: 'Al sustituir $x = r\\cos\\theta$ y $y = r\\sin\\theta$ en $x\\,dy - y\\,dx$, los términos con $r\'(\\theta)$ se cancelan milagrosamente y queda exactamente $r^2\\,d\\theta$!',
    action: 'Úsala para calcular áreas de cardioides $r = 1 + \\cos\\theta$, lemniscatas o rosas polares mediante Green en dos líneas.',
    trap: 'Integrar $\\theta$ en un intervalo donde $r(\\theta)$ recorre el pétalo dos veces.'
  },
  {
    id: 't5-11',
    topic: 't5',
    symbol: '$D \\text{ elemental (Tipo I y Tipo II simultáneamente)}$',
    name: 'Región Simple para la Demostración de Green',
    reading: 'dominio D simultáneamente de Tipo uno y Tipo dos',
    simple: 'Es el bloque constructivo de la prueba de Green: en Tipo I se demuestra $\\oint P\\,dx = -\\iint P_y\\,dA$, en Tipo II se demuestra $\\oint Q\\,dy = +\\iint Q_x\\,dA$, y al sumar ambas nace el Teorema de Green!',
    action: 'En la demostración formal, recuerda el signo menos que surge al recorrer el borde superior $y = g_2(x)$ de derecha ($b$) a izquierda ($a$).',
    trap: 'Perder el signo menos del borde superior en la prueba de $\\oint P\\,dx = -\\iint P_y\\,dA$.'
  }
];

window.GLOSSARY_BY_TOPIC = window.GLOSSARY_DATA.reduce((acc, item) => {
  if (!acc[item.topic]) acc[item.topic] = [];
  acc[item.topic].push(item);
  return acc;
}, {});
