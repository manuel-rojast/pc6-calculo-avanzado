/**
 * BANCO COMPLETO DE 90 EJERCICIOS GRADUADOS (NIVEL 0 AL 5) — PC6 (CM2A1 - UNI)
 * 5 Subtemas x 6 Niveles (N0..N5) x 3 Ejercicios por nivel = 90 ejercicios resueltos paso a paso.
 * Todos los signos de desigualdad en KaTeX usan \\lt / \\gt o espacios explícitos para seguridad DOM.
 */

if (typeof window === 'undefined') {
  var window = (typeof globalThis !== 'undefined') ? globalThis : this;
}

window.EXERCISES_DATA = [
  // ============================================================================
  // SUBTEMA 1: INTEGRALES DE LÍNEA DE CAMPOS ESCALARES (18 EJERCICIOS)
  // ============================================================================
  {
    id: 't1-01', topic: 't1', level: 0,
    title: 'Elemento de Longitud de Arco en un Segmento',
    statement: 'Calcule $\\int_C (2x + y)\\,ds$ donde $C$ es el segmento recto desde $(0,0)$ hasta $(3,4)$.',
    hint: 'Parametriza $\\alpha(t) = (3t, 4t)$ para $t \\in [0, 1]$ y halla la rapidez constante $\\|\\alpha\'(t)\\|$.',
    solution: '1. Parametrización: $\\alpha(t) = (3t, 4t)$, $t \\in [0,1]$.\n2. Velocidad y diferencial de arco: $\\alpha\'(t) = (3, 4) \\implies \\|\\alpha\'(t)\\| = \\sqrt{3^2 + 4^2} = 5$, luego $ds = 5\\,dt$.\n3. Integrando: $f(\\alpha(t)) = 2(3t) + 4t = 10t$.\n4. Integral:\n$$\\int_C (2x + y)\\,ds = \\int_0^1 (10t)(5)\\,dt = 50\\left[\\frac{t^2}{2}\\right]_0^1 = 25.$$',
    commonMistakes: 'Olvidar multiplicar por el factor $ds = 5\\,dt$ y calcular erróneamente $\\int_0^1 10t\\,dt = 5$.'
  },
  {
    id: 't1-02', topic: 't1', level: 0,
    title: 'Integral Escalar sobre una Circunferencia Centrada',
    statement: 'Evalúe $\\int_C (x^2 + y^2 + 3)\\,ds$, siendo $C$ la circunferencia $x^2 + y^2 = 4$.',
    hint: 'Sobre $C$, la expresión $x^2 + y^2$ vale constantemente $4$, así que el integrando es constante.',
    solution: '1. Sobre la curva $C$ se cumple $x^2 + y^2 = 4$, por lo que $f(x,y) = 4 + 3 = 7$.\n2. Por propiedad de linealidad y longitud de arco:\n$$\\int_C 7\\,ds = 7\\int_C 1\\,ds = 7\\,\\ell(C) = 7(2\\pi \\cdot 2) = 28\\pi.$$',
    commonMistakes: 'Expandir con senos y cosenos sin notar que $x^2+y^2=4$ es constante, o confundir radio $R=2$ con $R=4$.'
  },
  {
    id: 't1-03', topic: 't1', level: 0,
    title: 'Longitud de un Arco de Hélice Circular',
    statement: 'Halle la longitud de la hélice $\\alpha(t) = (\\cos t, \\sin t, 2t)$ para $t \\in [0, 2\\pi]$.',
    hint: 'Usa $\\ell(C) = \\int_0^{2\\pi} \\|\\alpha\'(t)\\|\\,dt$.',
    solution: '1. Derivamos: $\\alpha\'(t) = (-\\sin t, \\cos t, 2)$.\n2. Norma: $\\|\\alpha\'(t)\\| = \\sqrt{\\sin^2 t + \\cos^2 t + 4} = \\sqrt{5}$.\n3. Longitud:\n$$\\ell(C) = \\int_0^{2\\pi} \\sqrt{5}\\,dt = 2\\sqrt{5}\\,\\pi.$$',
    commonMistakes: 'Olvidar elevar al cuadrado la componente $z\'(t)=2$ dentro de la raíz (escribiendo $\\sqrt{1+2}$ en vez de $\\sqrt{1+4}$).'
  },
  {
    id: 't1-04', topic: 't1', level: 1,
    title: 'Masa de un Alambre Semicircular con Densidad Lineal',
    statement: 'Un alambre tiene forma de semicircunferencia superior $x^2 + y^2 = 9$, $y \\ge 0$, con densidad lineal $\\rho(x,y) = y$. Calcule su masa total $M$.',
    hint: 'Parametriza $\\alpha(t) = (3\\cos t, 3\\sin t)$ con $t \\in [0, \\pi]$ y $ds = 3\\,dt$.',
    solution: '1. Parametrización: $\\alpha(t) = (3\\cos t, 3\\sin t)$, $t \\in [0, \\pi]$, $ds = 3\\,dt$.\n2. Masa:\n$$M = \\int_C y\\,ds = \\int_0^\\pi (3\\sin t)(3)\\,dt = 9\\left[-\\cos t\\right]_0^\\pi = 9(1 - (-1)) = 18.$$',
    commonMistakes: 'Evaluar $[-\\cos t]_0^\\pi$ como $1 - 1 = 0$ olvidando el signo negativo de $\\cos\\pi = -1$.'
  },
  {
    id: 't1-05', topic: 't1', level: 1,
    title: 'Área de una Cortina Vertical sobre una Parábola',
    statement: 'Calcule el área de la cortina vertical $z = x$ sobre el arco parabólico $y = x^2$ para $x \\in [0, 2]$.',
    hint: 'Usa $\\alpha(t) = (t, t^2)$ con $ds = \\sqrt{1 + 4t^2}\\,dt$ y sustituye $u = 1 + 4t^2$.',
    solution: '1. Parametrización: $\\alpha(t) = (t, t^2)$, $t \\in [0, 2]$, $\\alpha\'(t) = (1, 2t) \\implies ds = \\sqrt{1 + 4t^2}\\,dt$.\n2. Área de la cortina:\n$$A = \\int_0^2 t\\sqrt{1 + 4t^2}\\,dt.$$\n3. Sustitución $u = 1 + 4t^2 \\implies du = 8t\\,dt$, con $u(0)=1$ y $u(2)=17$:\n$$A = \\frac{1}{8}\\int_1^{17} u^{1/2}\\,du = \\frac{1}{8}\\cdot\\frac{2}{3}\\left[u^{3/2}\\right]_1^{17} = \\frac{17\\sqrt{17} - 1}{12}.$$',
    commonMistakes: 'Olvidar cambiar los límites de integración al hacer $u = 1+4t^2$ o no incluir el factor $1/8$.'
  },
  {
    id: 't1-06', topic: 't1', level: 1,
    title: 'Integral Escalar sobre una Hélice en $\\mathbb{R}^3$',
    statement: 'Calcule $\\int_C (x^2 + y^2 + z^2)\\,ds$ a lo largo de la hélice $\\alpha(t) = (\\cos t, \\sin t, t)$ para $t \\in [0, 2\\pi]$.',
    hint: 'Sustituye $x^2+y^2 = 1$ y $z^2 = t^2$, con $ds = \\sqrt{2}\\,dt$.',
    solution: '1. Rapidez: $\\alpha\'(t) = (-\\sin t, \\cos t, 1) \\implies \\|\\alpha\'(t)\\| = \\sqrt{2}$.\n2. Integrando: $x^2 + y^2 + z^2 = 1 + t^2$.\n3. Cálculo:\n$$\\int_0^{2\\pi} (1 + t^2)\\sqrt{2}\\,dt = \\sqrt{2}\\left[t + \\frac{t^3}{3}\\right]_0^{2\\pi} = \\sqrt{2}\\left(2\\pi + \\frac{8\\pi^3}{3}\\right).$$',
    commonMistakes: 'Omitir el término $1$ proveniente de $\\cos^2 t + \\sin^2 t$.'
  },
  {
    id: 't1-07', topic: 't1', level: 2,
    title: 'Centro de Gravedad de un Alambre Semicircular Homogéneo',
    statement: 'Determine el centro de gravedad $(\\bar{x}, \\bar{y})$ de un alambre homogéneo ($\\rho = 1$) con forma de semicircunferencia $x^2 + y^2 = R^2$, $y \\ge 0$.',
    hint: 'Por simetría respecto al eje $Y$, $\\bar{x} = 0$. Calcula $M = \\pi R$ y $\\int_C y\\,ds$.',
    solution: '1. Masa (longitud): $M = \\int_0^\\pi R\\,dt = \\pi R$.\n2. Por simetría impar de $x = R\\cos t$ en $[0,\\pi]$: $\\int_C x\\,ds = R^2\\int_0^\\pi \\cos t\\,dt = 0 \\implies \\bar{x} = 0$.\n3. Momento en $y$:\n$$\\int_C y\\,ds = \\int_0^\\pi (R\\sin t)R\\,dt = R^2[-\\cos t]_0^\\pi = 2R^2.$$\n4. Por tanto $\\bar{y} = \\frac{2R^2}{\\pi R} = \\frac{2R}{\\pi}$. El centroide es $\\left(0, \\frac{2R}{\\pi}\\right)$.',
    commonMistakes: 'Confundir el centroide del arco semicircular ($2R/\\pi$) con el del semidisco plano ($4R/(3\\pi)$).'
  },
  {
    id: 't1-08', topic: 't1', level: 2,
    title: 'Integral sobre una Curva Regular a Trozos (Triángulo)',
    statement: 'Calcule $\\int_C (x + y)\\,ds$ donde $C$ es el perímetro del triángulo de vértices $A(0,0)$, $B(1,0)$ y $D(0,1)$.',
    hint: 'Divide $C = C_1 \\cup C_2 \\cup C_3$ en los tres lados; recuerda que $ds \\gt 0$ en todos los tramos.',
    solution: '1. Tramo $C_1$ de $(0,0)$ a $(1,0)$: $\\alpha_1(t)=(t,0)$, $t\\in[0,1]$, $ds=dt$. Integral: $\\int_0^1 t\\,dt = 1/2$.\n2. Tramo $C_2$ de $(1,0)$ a $(0,1)$: $\\alpha_2(t)=(1-t, t)$, $t\\in[0,1]$, $\\alpha_2\'=(-1,1) \\implies ds=\\sqrt{2}\\,dt$. Sobre $C_2$, $x+y=1$, luego $\\int_0^1 1\\cdot\\sqrt{2}\\,dt = \\sqrt{2}$.\n3. Tramo $C_3$ de $(0,1)$ a $(0,0)$: $\\alpha_3(t)=(0, 1-t)$, $t\\in[0,1]$, $ds=dt$. Integral: $\\int_0^1 (1-t)\\,dt = 1/2$.\n4. Total: $I = \\frac{1}{2} + \\sqrt{2} + \\frac{1}{2} = 1 + \\sqrt{2}$.',
    commonMistakes: 'Poner signo negativo al tramo $C_3$ por bajar hacia $(0,0)$: en integrales ESCALARES, $ds$ siempre es positivo.'
  },
  {
    id: 't1-09', topic: 't1', level: 2,
    title: 'Momento de Inercia de un Aro Circular respecto al Eje $Z$',
    statement: 'Un aro $x^2 + y^2 = a^2$ en el plano $z=0$ tiene densidad $\\rho(x,y) = x^2$. Halle su masa $M$ y su momento de inercia $I_z = \\int_C (x^2+y^2)\\rho\\,ds$.',
    hint: 'Parametriza $\\alpha(t) = (a\\cos t, a\\sin t)$, $t \\in [0, 2\\pi]$ y usa $\\int_0^{2\\pi} \\cos^2 t\\,dt = \\pi$.',
    solution: '1. Masa:\n$$M = \\int_0^{2\\pi} (a^2\\cos^2 t)\\,a\\,dt = a^3\\int_0^{2\\pi} \\cos^2 t\\,dt = \\pi a^3.$$\n2. Momento de inercia respecto al eje $Z$: sobre el aro $x^2+y^2 = a^2$ es constante, luego:\n$$I_z = \\int_C a^2 \\rho(x,y)\\,ds = a^2 M = \\pi a^5.$$',
    commonMistakes: 'No aprovechar que $x^2+y^2 = a^2$ sale fuera de la integral ahorrando todo el cálculo repetido.'
  },
  {
    id: 't1-10', topic: 't1', level: 3,
    title: 'Curva Intersección de Esfera y Plano (Estilo Examen UNI)',
    statement: 'Calcule $\\int_C x^2\\,ds$ donde $C$ es la intersección de la esfera $x^2+y^2+z^2=R^2$ con el plano $x + y + z = 0$.',
    hint: 'Usa la simetría total entre $x, y, z$: $\\int_C x^2\\,ds = \\int_C y^2\\,ds = \\int_C z^2\\,ds$.',
    solution: '1. El plano $x+y+z=0$ pasa por el centro $(0,0,0)$ de la esfera, por lo que $C$ es un círculo máximo de radio $R$ y longitud $\\ell(C) = 2\\pi R$.\n2. Tanto la esfera como el plano son invariantes bajo cualquier permutación de $(x,y,z)$, luego:\n$$\\int_C x^2\\,ds = \\int_C y^2\\,ds = \\int_C z^2\\,ds.$$\n3. Sumando las tres integrales:\n$$3\\int_C x^2\\,ds = \\int_C (x^2 + y^2 + z^2)\\,ds = \\int_C R^2\\,ds = R^2(2\\pi R) = 2\\pi R^3.$$\n4. Por tanto $\\int_C x^2\\,ds = \\frac{2\\pi R^3}{3}$.',
    commonMistakes: 'Intentar construir una base ortonormal en el plano $x+y+z=0$ para parametrizar $C$ cuando la simetría resuelve el problema en 3 líneas.'
  },
  {
    id: 't1-11', topic: 't1', level: 3,
    title: 'Integral Escalar sobre un Astroide en el Primer Cuadrante',
    statement: 'Evalúe $\\int_C (x^{1/3} + y^{1/3})\\,ds$ donde $C$ es el arco del astroide $x = a\\cos^3 t$, $y = a\\sin^3 t$, $t \\in [0, \\pi/2]$ ($a \\gt 0$).',
    hint: 'Calcula $\\|\\alpha\'(t)\\| = 3a\\sin t\\cos t$ (en el primer cuadrante $\\sin t, \\cos t \\ge 0$).',
    solution: '1. Derivadas: $x\'(t) = -3a\\cos^2 t\\sin t$, $y\'(t) = 3a\\sin^2 t\\cos t$.\n2. Rapidez:\n$$\\|\\alpha\'(t)\\| = 3a|\\sin t\\cos t|\\sqrt{\\cos^2 t + \\sin^2 t} = 3a\\sin t\\cos t \\quad (t \\in [0,\\pi/2]).$$\n3. Integrando: $x^{1/3} + y^{1/3} = a^{1/3}(\\cos t + \\sin t)$.\n4. Integral:\n$$I = 3a^{4/3}\\int_0^{\\pi/2} (\\cos^2 t\\sin t + \\sin^2 t\\cos t)\\,dt = 3a^{4/3}\\left[-\\frac{\\cos^3 t}{3} + \\frac{\\sin^3 t}{3}\\right]_0^{\\pi/2} = 3a^{4/3}\\left(\\frac{1}{3} + \\frac{1}{3}\\right) = 2a^{4/3}.$$',
    commonMistakes: 'Olvidar el valor absoluto $|\\sin t\\cos t|$ si el intervalo abarcase los 4 cuadrantes (en $[0,2\\pi]$ daría $0$ si omites el valor absoluto!).'
  },
  {
    id: 't1-12', topic: 't1', level: 3,
    title: 'Área de Cortina bajo Cilindro y Superficie (Examen UNI)',
    statement: 'Calcule el área de la porción del cilindro $x^2 + y^2 = 2x$ situada en el primer octante entre $z = 0$ y el cono $z = \\sqrt{x^2 + y^2}$.',
    hint: 'La base en el plano $XY$ es la semicircunferencia $(x-1)^2 + y^2 = 1$ ($y \\ge 0$): usa $\\alpha(t) = (1 + \\cos t, \\sin t)$, $t \\in [0, \\pi]$.',
    solution: '1. Parametrización del arco en el primer cuadrante: $x = 1 + \\cos t$, $y = \\sin t$, $t \\in [0, \\pi]$, con $ds = \\sqrt{(-\\sin t)^2 + \\cos^2 t}\\,dt = dt$.\n2. Altura del cono sobre el cilindro:\n$$z = \\sqrt{x^2+y^2} = \\sqrt{2x} = \\sqrt{2(1+\\cos t)} = \\sqrt{4\\cos^2(t/2)} = 2\\cos(t/2) \\quad (t/2 \\in [0,\\pi/2]).$$\n3. Área:\n$$A = \\int_0^\\pi 2\\cos(t/2)\\,dt = \\left[4\\sin(t/2)\\right]_0^\\pi = 4.$$',
    commonMistakes: 'Usar $t \\in [0, 2\\pi]$ para el primer octante (donde $y \\ge 0$ exige solo $t \\in [0,\\pi]$).'
  },
  {
    id: 't1-13', topic: 't1', level: 4,
    title: 'Integral sobre Curva Polar (Cardioide)',
    statement: 'Calcule $\\int_C \\sqrt{x^2+y^2}\\,ds$ sobre la mitad superior del cardioide $r = 1 + \\cos\\theta$, $\\theta \\in [0, \\pi]$.',
    hint: 'En coordenadas polares $ds = \\sqrt{r^2 + (r\')^2}\\,d\\theta = 2\\cos(\\theta/2)\\,d\\theta$.',
    solution: '1. En polares $r = 1+\\cos\\theta$, $r\' = -\\sin\\theta$, luego:\n$$ds = \\sqrt{(1+\\cos\\theta)^2 + \\sin^2\\theta}\\,d\\theta = \\sqrt{2 + 2\\cos\\theta}\\,d\\theta = 2\\cos(\\theta/2)\\,d\\theta \\quad (\\theta \\in [0,\\pi]).$$\n2. Además $\\sqrt{x^2+y^2} = r = 1+\\cos\\theta = 2\\cos^2(\\theta/2)$.\n3. Integral:\n$$I = \\int_0^\\pi 4\\cos^3(\\theta/2)\\,d\\theta.$$\nCon $u = \\theta/2$, $d\\theta = 2\\,du$:\n$$I = 8\\int_0^{\\pi/2} (1 - \\sin^2 u)\\cos u\\,du = 8\\left[\\sin u - \\frac{\\sin^3 u}{3}\\right]_0^{\\pi/2} = 8\\left(1 - \\frac{1}{3}\\right) = \\frac{16}{3}.$$',
    commonMistakes: 'Escribir $ds = r\\,d\\theta$ olvidando el término $(r\')^2$ (eso solo vale en circunferencias de radio constante!).'
  },
  {
    id: 't1-14', topic: 't1', level: 4,
    title: 'Acotación Analítica sin Parametrizar Completamente',
    statement: 'Sea $C$ la curva cerrada $x^4 + y^4 = 16$. Demuestre que $\\left|\\int_C \\frac{\\sin(xy)}{1 + x^2 + y^2}\\,ds\\right| \\le \\frac{\\ell(C)}{5}$.',
    hint: 'Usa Cauchy-Schwarz en $\\mathbb{R}^2$: $(x^2+y^2)^2 \\ge x^4 + y^4 = 16$ para hallar una cota inferior de $x^2+y^2$ sobre $C$.',
    solution: '1. Sobre $C$: $x^4 + y^4 = 16$. Como $2x^2y^2 \\ge 0$, tenemos $(x^2+y^2)^2 = x^4 + y^4 + 2x^2y^2 \\ge 16$, de donde $x^2 + y^2 \\ge 4$ en todo punto de $C$.\n2. Además $|\\sin(xy)| \\le 1$, luego para todo $(x,y) \\in C$:\n$$\\left|\\frac{\\sin(xy)}{1 + x^2 + y^2}\\right| \\le \\frac{1}{1 + 4} = \\frac{1}{5}.$$\n3. Por la desigualdad ML de integrales escalares:\n$$\\left|\\int_C \\frac{\\sin(xy)}{1 + x^2 + y^2}\\,ds\\right| \\le \\frac{1}{5}\\int_C 1\\,ds = \\frac{\\ell(C)}{5}. \\quad \\blacksquare$$',
    commonMistakes: 'Acotar el denominador por $1$ diciendo $x^2+y^2 \\ge 0$, lo que da una cota demasiado débil ($\\ell(C)$ en lugar de $\\ell(C)/5$).'
  },
  {
    id: 't1-15', topic: 't1', level: 4,
    title: 'Integral Escalar sobre una Espiral Cónica en $\\mathbb{R}^3$',
    statement: 'Calcule $\\int_C (x^2+y^2)\\,ds$ a lo largo de la espiral cónica $\\alpha(t) = (e^t\\cos t, e^t\\sin t, e^t)$ para $t \\in [0, \\ln 2]$.',
    hint: 'Calcula $\\|\\alpha\'(t)\\| = \\sqrt{3}\\,e^t$ y observa que $x^2+y^2 = e^{2t}$.',
    solution: '1. Derivamos la espiral cónica $\\alpha(t) = (e^t\\cos t, e^t\\sin t, e^t)$:\n$$\\alpha\'(t) = (e^t(\\cos t - \\sin t),\\; e^t(\\sin t + \\cos t),\\; e^t).$$\n2. Rapidez:\n$$\\|\\alpha\'(t)\\| = e^t\\sqrt{(\\cos t-\\sin t)^2 + (\\sin t+\\cos t)^2 + 1} = e^t\\sqrt{2 + 1} = \\sqrt{3}\\,e^t.$$\n3. Sobre $C$: $x^2 + y^2 = e^{2t}$. Luego:\n$$\\int_C (x^2+y^2)\\,ds = \\int_0^{\\ln 2} e^{2t}(\\sqrt{3}\\,e^t)\\,dt = \\sqrt{3}\\int_0^{\\ln 2} e^{3t}\\,dt = \\frac{\\sqrt{3}}{3}\\left[e^{3t}\\right]_0^{\\ln 2} = \\frac{\\sqrt{3}}{3}(8 - 1) = \\frac{7\\sqrt{3}}{3}.$$',
    commonMistakes: 'Error algebraico al elevar $(\\cos t - \\sin t)^2 + (\\sin t + \\cos t)^2$: los términos cruzados se cancelan y da $2$, no $1$.'
  },
  {
    id: 't1-16', topic: 't1', level: 5,
    title: 'Demostración de Invariancia frente a Reparametrización Regular',
    statement: 'Sean $\\alpha:[a,b]\\to\\mathbb{R}^n$ y $\\beta:[c,d]\\to\\mathbb{R}^n$ dos parametrizaciones regulares equivalentes de $C$ mediante un difeomorfismo $\\varphi:[c,d]\\to[a,b]$ ($\\beta = \\alpha \\circ \\varphi$). Demuestre rigurosamente que $\\int_c^d f(\\beta(u))\\|\\beta\'(u)\\|\\,du = \\int_a^b f(\\alpha(t))\\|\\alpha\'(t)\\|\\,dt$ tanto si $\\varphi\' \\gt 0$ como si $\\varphi\' \\lt 0$.',
    hint: 'Aplica la regla de la cadena y separa ambos casos usando $|\\varphi\'(u)| = +\\varphi\'(u)$ o $-\\varphi\'(u)$, junto con la inversión de límites.',
    solution: '1. Por regla de la cadena, $\\beta\'(u) = \\alpha\'(\\varphi(u))\\,\\varphi\'(u)$, luego $\\|\\beta\'(u)\\| = \\|\\alpha\'(\\varphi(u))\\|\\,|\\varphi\'(u)|$.\n2. **Caso 1 ($\\varphi\'(u) \\gt 0$):** $\\varphi(c)=a, \\varphi(d)=b$ y $|\\varphi\'(u)| = \\varphi\'(u)$. Haciendo $t = \\varphi(u)$, $dt = \\varphi\'(u)\\,du$:\n$$\\int_c^d f(\\alpha(\\varphi(u)))\\|\\alpha\'(\\varphi(u))\\|\\varphi\'(u)\\,du = \\int_a^b f(\\alpha(t))\\|\\alpha\'(t)\\|\\,dt.$$\n3. **Caso 2 ($\\varphi\'(u) \\lt 0$):** $\\varphi(c)=b, \\varphi(d)=a$ y $|\\varphi\'(u)| = -\\varphi\'(u)$. Con $t = \\varphi(u)$, $dt = \\varphi\'(u)\\,du$:\n$$\\int_c^d f(\\alpha(\\varphi(u)))\\|\\alpha\'(\\varphi(u))\\|(-\\varphi\'(u))\\,du = -\\int_b^a f(\\alpha(t))\\|\\alpha\'(t)\\|\\,dt = +\\int_a^b f(\\alpha(t))\\|\\alpha\'(t)\\|\\,dt.$$ En ambos casos los valores coinciden. $\\blacksquare$',
    commonMistakes: 'Omitir el Caso 2 ($\\varphi\' \\lt 0$) o perder el signo menos al sacar $\\varphi\'(u)$ de la norma euclídea.'
  },
  {
    id: 't1-17', topic: 't1', level: 5,
    title: 'Teorema del Valor Medio para Integrales de Línea Escalares',
    statement: 'Sea $C$ una curva regular conexa de longitud $\\ell(C) \\gt 0$ y $f: U \\to \\mathbb{R}$ continua en un abierto $U \\supset C$. Demuestre que existe al menos un punto $p^* \\in C$ tal que $\\int_C f\\,ds = f(p^*)\\,\\ell(C)$.',
    hint: 'Reduce el problema a la integral sobre $[a,b]$ con peso positivo $g(t) = \\|\\alpha\'(t)\\| \\gt 0$ y aplica Weierstrass + Valor Intermedio.',
    solution: '1. Como $[a,b]$ es compacto y $t \\mapsto f(\\alpha(t))$ es continua, existen $m = \\min_{[a,b]} f(\\alpha(t))$ y $M = \\max_{[a,b]} f(\\alpha(t))$.\n2. Multiplicando $m \\le f(\\alpha(t)) \\le M$ por $\\|\\alpha\'(t)\\| \\ge 0$ e integrando en $[a,b]$:\n$$m\\,\\ell(C) \\le \\int_a^b f(\\alpha(t))\\|\\alpha\'(t)\\|\\,dt \\le M\\,\\ell(C).$$\n3. Dividiendo entre $\\ell(C) \\gt 0$: $m \\le \\frac{1}{\\ell(C)}\\int_C f\\,ds \\le M$.\n4. Por el Teorema del Valor Intermedio aplicado a la función continua $t \\mapsto f(\\alpha(t))$ en $[a,b]$, existe $t^* \\in [a,b]$ tal que $f(\\alpha(t^*)) = \\frac{1}{\\ell(C)}\\int_C f\\,ds$. Tomando $p^* = \\alpha(t^*) \\in C$ queda probado. $\\blacksquare$',
    commonMistakes: 'No justificar que $\\|\\alpha\'(t)\\| \\ge 0$ (condición necesaria para preservar la desigualdad al multiplicar) ni la compacidad/conexidad de $[a,b]$.'
  },
  {
    id: 't1-18', topic: 't1', level: 5,
    title: 'Límite del Promedio de Línea sobre Circunferencias que Colapsan',
    statement: 'Sea $f \\in C(\\mathbb{R}^2)$ y $C_r$ la circunferencia de centro $p_0 = (x_0, y_0)$ y radio $r \\gt 0$. Demuestre rigurosamente que $\\lim_{r \\to 0^+} \\frac{1}{2\\pi r} \\int_{C_r} f\\,ds = f(p_0)$.',
    hint: 'Usa la definición $\\varepsilon$-$\\delta$ de continuidad de $f$ en $p_0$ y la desigualdad ML sobre $C_r$.',
    solution: '1. Dado $\\varepsilon \\gt 0$, por continuidad de $f$ en $p_0$, existe $\\delta \\gt 0$ tal que si $\\|p - p_0\\| \\lt \\delta$, entonces $|f(p) - f(p_0)| \\lt \\varepsilon$.\n2. Tomemos $0 \\lt r \\lt \\delta$. Para todo $p \\in C_r$, $\\|p - p_0\\| = r \\lt \\delta$, luego $|f(p) - f(p_0)| \\lt \\varepsilon$.\n3. Como $\\frac{1}{2\\pi r}\\int_{C_r} f(p_0)\\,ds = f(p_0)$, estimamos:\n$$\\left|\\frac{1}{2\\pi r}\\int_{C_r} f\\,ds - f(p_0)\\right| = \\left|\\frac{1}{2\\pi r}\\int_{C_r} (f(p) - f(p_0))\\,ds\\right| \\le \\frac{1}{2\\pi r}\\int_{C_r} |f(p)-f(p_0)|\\,ds \\lt \\frac{1}{2\\pi r} \\cdot \\varepsilon(2\\pi r) = \\varepsilon.$$\n4. Como $\\varepsilon \\gt 0$ fue arbitrario, el límite es $f(p_0)$. $\\blacksquare$',
    commonMistakes: 'Asumir que $f$ es $C^1$ y usar Taylor cuando la continuidad simple es suficiente mediante $\\varepsilon$-$\\delta$.'
  },

  // ============================================================================
  // SUBTEMA 2: INTEGRALES DE LÍNEA DE CAMPOS VECTORIALES Y TRABAJO (18 EJERCICIOS)
  // ============================================================================
  {
    id: 't2-01', topic: 't2', level: 0,
    title: 'Trabajo en Línea Recta de un Campo Constante',
    statement: 'Calcule $\\int_C \\vec{F}\\cdot d\\vec{r}$ para $\\vec{F}(x,y) = (3, -2)$ a lo largo del segmento $C$ de $(1,1)$ a $(4,5)$.',
    hint: 'Parametriza $\\alpha(t) = (1+3t, 1+4t)$ para $t \\in [0,1]$ y realiza el producto punto $\\vec{F}\\cdot\\alpha\'(t)$.',
    solution: '1. $\\alpha(t) = (1+3t, 1+4t)$, $t \\in [0,1] \\implies \\alpha\'(t) = (3, 4)$.\n2. Producto punto: $\\vec{F}(\\alpha(t))\\cdot\\alpha\'(t) = (3,-2)\\cdot(3,4) = 9 - 8 = 1$.\n3. Integral:\n$$\\int_C \\vec{F}\\cdot d\\vec{r} = \\int_0^1 1\\,dt = 1.$$',
    commonMistakes: 'Multiplicar por $\\|\\alpha\'(t)\\| = 5$ (error típico al confundir integral vectorial con escalar).'
  },
  {
    id: 't2-02', topic: 't2', level: 0,
    title: 'Forma Diferencial Directa sobre una Parábola',
    statement: 'Evalúe $\\int_C x\\,dx + y\\,dy$ a lo largo de $y = x^2$ desde $(0,0)$ hasta $(2,4)$.',
    hint: 'Toma $x = t$, $y = t^2$ con $t \\in [0,2]$, $dx = dt$, $dy = 2t\\,dt$.',
    solution: '1. Parametrización: $x = t$, $y = t^2$, $t \\in [0,2] \\implies dx = dt$, $dy = 2t\\,dt$.\n2. Sustitución:\n$$\\int_C x\\,dx + y\\,dy = \\int_0^2 \\left(t\\,dt + t^2(2t\\,dt)\\right) = \\int_0^2 (t + 2t^3)\\,dt = \\left[\\frac{t^2}{2} + \\frac{t^4}{2}\\right]_0^2 = 2 + 8 = 10.$$',
    commonMistakes: 'Olvidar derivar $y = t^2$ al reemplazar $dy = 2t\\,dt$.'
  },
  {
    id: 't2-03', topic: 't2', level: 0,
    title: 'Efecto de Invertir el Sentido de una Curva',
    statement: 'Si $\\int_C \\vec{F}\\cdot d\\vec{r} = 14$ cuando $C$ va de $A$ hacia $B$, ¿cuánto vale $\\int_{-C} (3\\vec{F})\\cdot d\\vec{r}$?',
    hint: 'Combina linealidad de la integral de línea con $\\int_{-C} \\vec{F}\\cdot d\\vec{r} = -\\int_C \\vec{F}\\cdot d\\vec{r}$.',
    solution: '1. Por linealidad e inversión de orientación:\n$$\\int_{-C} (3\\vec{F})\\cdot d\\vec{r} = 3\\int_{-C} \\vec{F}\\cdot d\\vec{r} = -3\\int_C \\vec{F}\\cdot d\\vec{r} = -3(14) = -42.$$',
    commonMistakes: 'Responder $+42$ por confundir el comportamiento con la integral escalar.'
  },
  {
    id: 't2-04', topic: 't2', level: 1,
    title: 'Circulación del Campo Rotacional $\\vec{F} = (-y, x)$',
    statement: 'Calcule la circulación $\\oint_C (-y\\,dx + x\\,dy)$ a lo largo de la circunferencia $x^2 + y^2 = R^2$ recorrida en sentido antihorario.',
    hint: 'Parametriza $x = R\\cos t$, $y = R\\sin t$ para $t \\in [0, 2\\pi]$.',
    solution: '1. $x = R\\cos t \\implies dx = -R\\sin t\\,dt$; $y = R\\sin t \\implies dy = R\\cos t\\,dt$.\n2. Sustituimos:\n$$-y\\,dx + x\\,dy = (-R\\sin t)(-R\\sin t\\,dt) + (R\\cos t)(R\\cos t\\,dt) = R^2(\\sin^2 t + \\cos^2 t)\\,dt = R^2\\,dt.$$\n3. Integral:\n$$\\oint_C (-y\\,dx + x\\,dy) = \\int_0^{2\\pi} R^2\\,dt = 2\\pi R^2.$$',
    commonMistakes: 'Cometer un error de signo en $(-R\\sin t)(-R\\sin t)$ obteniendo $0$ en vez de $R^2$.'
  },
  {
    id: 't2-05', topic: 't2', level: 1,
    title: 'Trabajo de un Campo en $\\mathbb{R}^3$ a lo largo de una Cúbica Alabeada',
    statement: 'Calcule el trabajo de $\\vec{F}(x,y,z) = (y, z, x)$ sobre $\\alpha(t) = (t, t^2, t^3)$ para $t \\in [0, 1]$.',
    hint: 'Evalúa $\\vec{F}(\\alpha(t)) = (t^2, t^3, t)$ y $\\alpha\'(t) = (1, 2t, 3t^2)$.',
    solution: '1. $\\vec{F}(\\alpha(t))\\cdot\\alpha\'(t) = (t^2)(1) + (t^3)(2t) + (t)(3t^2) = t^2 + 2t^4 + 3t^3$.\n2. Integramos en $[0,1]$:\n$$W = \\int_0^1 (t^2 + 3t^3 + 2t^4)\\,dt = \\frac{1}{3} + \\frac{3}{4} + \\frac{2}{5} = \\frac{20 + 45 + 24}{60} = \\frac{89}{60}.$$',
    commonMistakes: 'Evaluar las componentes de $\\vec{F}$ en el orden $(x,y,z)$ en lugar de $(y,z,x)$.'
  },
  {
    id: 't2-06', topic: 't2', level: 1,
    title: 'Dependencia del Camino en un Campo No Conservativo',
    statement: 'Para $\\vec{F}(x,y) = (y, 0)$, calcule $\\int_{C_1} \\vec{F}\\cdot d\\vec{r}$ (segmento recto de $(0,0)$ a $(1,1)$) y $\\int_{C_2} \\vec{F}\\cdot d\\vec{r}$ (parábola $y = x^2$ de $(0,0)$ a $(1,1)$).',
    hint: 'Evalúa $\\int y\\,dx$ en ambas curvas y compara los resultados.',
    solution: '1. Sobre $C_1$: $y = x$, $x \\in [0,1] \\implies \\int_0^1 x\\,dx = \\frac{1}{2}$.\n2. Sobre $C_2$: $y = x^2$, $x \\in [0,1] \\implies \\int_0^1 x^2\\,dx = \\frac{1}{3}$.\n3. Como $\\frac{1}{2} \\neq \\frac{1}{3}$, la integral depende de la trayectoria y $\\vec{F}$ no es conservativo.',
    commonMistakes: 'Creer que dos curvas con los mismos extremos siempre dan la misma integral de línea.'
  },
  {
    id: 't2-07', topic: 't2', level: 2,
    title: 'Integral sobre Poligonal Abierta en el Espacio',
    statement: 'Calcule $\\int_C (x\\,dx + yz\\,dy + z\\,dz)$ a lo largo de la poligonal que une $(0,0,0) \\to (1,0,0) \\to (1,2,0) \\to (1,2,3)$.',
    hint: 'En cada tramo solo cambia UNA coordenada, anulando los otros dos diferenciales!',
    solution: '1. $C_1$: $(t,0,0)$, $t\\in[0,1]$ ($dy=dz=0$) $\\implies \\int_0^1 t\\,dt = \\frac{1}{2}$.\n2. $C_2$: $(1,t,0)$, $t\\in[0,2]$ ($dx=dz=0, z=0$) $\\implies \\int_0^2 0\\,dt = 0$.\n3. $C_3$: $(1,2,t)$, $t\\in[0,3]$ ($dx=dy=0$) $\\implies \\int_0^3 t\\,dt = \\frac{9}{2}$.\n4. Suma total: $I = \\frac{1}{2} + 0 + \\frac{9}{2} = 5$.',
    commonMistakes: 'Dejar $z$ sin sustituir en $C_2$ donde $z = 0$ anula inmediatamente el término $yz\\,dy$.'
  },
  {
    id: 't2-08', topic: 't2', level: 2,
    title: 'Flujo 2D de un Fluido a Través de una Tubería Circular (PC6 2024-II #4a)',
    statement: 'Sea $C: x^2 + y^2 = r^2$ la sección transversal de una tubería orientada positivamente y $\\vec{F}(x,y) = (-y, x)$. Calcule el flujo saliente $\\oint_C \\vec{F}\\cdot\\vec{n}\\,ds$.',
    hint: 'El flujo 2D usa la normal unitaria exterior $\\vec{n} = (x/r, y/r)$, es decir $\\oint_C (P\\,dy - Q\\,dx)$.',
    solution: '1. Sobre $C$: $\\alpha(t) = (r\\cos t, r\\sin t)$, $t \\in [0, 2\\pi]$.\n2. El vector normal exterior es $\\vec{n}(t) = (\\cos t, \\sin t)$ y $ds = r\\,dt$.\n3. Producto punto con $\\vec{F}(\\alpha(t)) = (-r\\sin t, r\\cos t)$:\n$$\\vec{F}(\\alpha(t))\\cdot\\vec{n}(t) = -r\\sin t\\cos t + r\\cos t\\sin t = 0.$$\n4. Por tanto el flujo saliente es $\\oint_C \\vec{F}\\cdot\\vec{n}\\,ds = 0$ (el campo es puramente tangencial a la tubería y nada atraviesa la pared!).',
    commonMistakes: 'Calcular la circulación $\\oint \\vec{F}\\cdot d\\vec{r} = 2\\pi r^2$ en vez del FLUJO $\\oint \\vec{F}\\cdot\\vec{n}\\,ds = 0$!'
  },
  {
    id: 't2-09', topic: 't2', level: 2,
    title: 'Trabajo sobre una Hélice con Campo Rotacional-Vertical',
    statement: 'Calcule $\\int_C \\vec{F}\\cdot d\\vec{r}$ para $\\vec{F}(x,y,z) = (-y, x, z^2)$ sobre la hélice $\\alpha(t) = (\\cos t, \\sin t, t)$, $t \\in [0, 2\\pi]$.',
    hint: 'Evalúa $\\vec{F}(\\alpha(t)) = (-\\sin t, \\cos t, t^2)$ y haz producto escalar con $(-\\sin t, \\cos t, 1)$.',
    solution: '1. $\\alpha\'(t) = (-\\sin t, \\cos t, 1)$.\n2. Producto punto:\n$$\\vec{F}(\\alpha(t))\\cdot\\alpha\'(t) = \\sin^2 t + \\cos^2 t + t^2 = 1 + t^2.$$\n3. Integral:\n$$W = \\int_0^{2\\pi} (1 + t^2)\\,dt = 2\\pi + \\frac{8\\pi^3}{3}.$$',
    commonMistakes: 'Multiplicar el resultado por $\\sqrt{2}$ confundiendo $d\\vec{r} = \\alpha\'(t)\\,dt$ con $ds = \\|\\alpha\'(t)\\|\\,dt$.'
  },
  {
    id: 't2-10', topic: 't2', level: 3,
    title: 'Elipse Intersección de Paraboloide y Plano (PC6 2026-I #2)',
    statement: 'Considere $\\vec{F}(x,y,z) = (8x+z,\\; 2xz^2,\\; -4y^2)$. Calcule $\\oint_C \\vec{F}\\cdot d\\vec{r}$ a lo largo de la curva $z = 9 - 2x^2 - 4y^2$, $z = 1$, orientada positivamente vista desde $+Z$.',
    hint: 'Iguala $z=1$ para obtener la elipse $\\frac{x^2}{4} + \\frac{y^2}{2} = 1$ en el plano $z=1$ y parametriza $(2\\cos t, \\sqrt{2}\\sin t, 1)$.',
    solution: '1. Intersección: $2x^2 + 4y^2 = 8 \\implies \\frac{x^2}{4} + \\frac{y^2}{2} = 1$ en $z=1$.\n2. Parametrización antihoraria: $\\alpha(t) = (2\\cos t, \\sqrt{2}\\sin t, 1)$, $t \\in [0, 2\\pi]$, $\\alpha\'(t) = (-2\\sin t, \\sqrt{2}\\cos t, 0)$.\n3. Campo en la curva: $\\vec{F}(\\alpha(t)) = (16\\cos t + 1,\\; 4\\cos t,\\; -8\\sin^2 t)$.\n4. Producto punto:\n$$\\vec{F}\\cdot\\alpha\' = -32\\cos t\\sin t - 2\\sin t + 4\\sqrt{2}\\cos^2 t.$$\n5. Integrando en $[0, 2\\pi]$: los dos primeros términos integran $0$ por periodicidad, y $\\int_0^{2\\pi} \\cos^2 t\\,dt = \\pi$, luego:\n$$\\oint_C \\vec{F}\\cdot d\\vec{r} = 4\\sqrt{2}\\,\\pi.$$',
    commonMistakes: 'Confundir los semiejes $a=2, b=\\sqrt{2}$ poniendo $a=4, b=2$, u orientar la elipse en sentido horario.'
  },
  {
    id: 't2-11', topic: 't2', level: 3,
    title: 'Proposiciones V/F de Ángulo Ortogonal y Curva Integral (PC6 2025-II #1a y #1b)',
    statement: 'Sea $\\vec{F}: U \\subset \\mathbb{R}^2 \\to \\mathbb{R}^2 \\setminus \\{(0,0)\\}$ continuo y $\\Gamma$ regular $C^1$ parametrizada por $\\alpha(t)$, $t\\in[a,b]$. Analice: (a) Si $\\angle(\\vec{F}(\\alpha(t)), \\alpha\'(t)) = \\pi/2$ en todo $t$, entonces $\\int_\\Gamma \\vec{F}\\cdot d\\alpha = 0$. (b) Si $\\Gamma$ es curva integral de $\\vec{F}$ ($\\alpha\'(t) = \\vec{F}(\\alpha(t))$), entonces $\\int_\\Gamma \\vec{F}\\cdot d\\alpha = \\int_\\Gamma \\|\\vec{F}\\|\\,ds$.',
    hint: 'Escribe $\\vec{F}\\cdot\\alpha\' = \\|\\vec{F}\\|\\,\\|\\alpha\'\\|\\cos\\theta$ en ambos incisos.',
    solution: '1. **(a) VERDADERO:** Como el ángulo entre $\\vec{F}(\\alpha(t))$ y la tangente $\\alpha\'(t)$ es $\\pi/2$, su producto interno es $\\vec{F}(\\alpha(t))\\cdot\\alpha\'(t) = \\|\\vec{F}\\|\\,\\|\\alpha\'\\|\\cos(\\pi/2) = 0$ para todo $t \\in [a,b]$. Luego $\\int_\\Gamma \\vec{F}\\cdot d\\alpha = \\int_a^b 0\\,dt = 0$.\n2. **(b) VERDADERO:** Por definición de curva integral, $\\alpha\'(t) = \\vec{F}(\\alpha(t))$, luego $\\vec{F}(\\alpha(t))\\cdot\\alpha\'(t) = \\|\\vec{F}(\\alpha(t))\\|^2 = \\|\\vec{F}(\\alpha(t))\\|\\,\\|\\alpha\'(t)\\|$. Integrando en $[a,b]$:\n$$\\int_\\Gamma \\vec{F}\\cdot d\\alpha = \\int_a^b \\|\\vec{F}(\\alpha(t))\\|\\,\\|\\alpha\'(t)\\|\\,dt = \\int_\\Gamma \\|\\vec{F}\\|\\,ds. \\quad \\blacksquare$$',
    commonMistakes: 'Dudar del inciso (b) por no recordar la definición exacta de curva integral $\\alpha\'(t) = \\vec{F}(\\alpha(t))$.'
  },
  {
    id: 't2-12', topic: 't2', level: 3,
    title: 'Integral Vectorial sobre Intersección de Cilindro y Plano Oblicuo',
    statement: 'Calcule $\\oint_C (y\\,dx + z\\,dy + x\\,dz)$ sobre la curva intersección de $x^2 + y^2 = 1$ y $z = x + y$, orientada antihorariamente vista desde $+Z$.',
    hint: 'Parametriza $x = \\cos t$, $y = \\sin t$, $z = \\cos t + \\sin t$ para $t \\in [0, 2\\pi]$.',
    solution: '1. $\\alpha(t) = (\\cos t, \\sin t, \\cos t + \\sin t)$, $\\alpha\'(t) = (-\\sin t, \\cos t, -\\sin t + \\cos t)$.\n2. Producto punto:\n$$y\\,x\' + z\\,y\' + x\\,z\' = -\\sin^2 t + (\\cos t + \\sin t)\\cos t + \\cos t(-\\sin t + \\cos t)$$\n$$= -\\sin^2 t + \\cos^2 t + \\sin t\\cos t - \\sin t\\cos t + \\cos^2 t = 2\\cos^2 t - \\sin^2 t.$$\n3. Integrando en $[0, 2\\pi]$ (donde $\\int \\cos^2 = \\int \\sin^2 = \\pi$):\n$$I = 2\\pi - \\pi = \\pi.$$',
    commonMistakes: 'Simplificar mal el signo de $z\'(t) = -\\sin t + \\cos t$.'
  },
  {
    id: 't2-13', topic: 't2', level: 4,
    title: 'Cálculo de Trabajo sobre una Cicloide',
    statement: 'Calcule el trabajo de $\\vec{F}(x,y) = (y, x)$ a lo largo de un arco de cicloide $x(t) = a(t - \\sin t)$, $y(t) = a(1 - \\cos t)$, $t \\in [0, 2\\pi]$.',
    hint: 'Observa que $y\\,dx + x\\,dy = d(xy)$ es una diferencial exacta!',
    solution: '1. Reconocemos $\\vec{F}(x,y) = (y,x) = \\nabla(xy)$ en todo $\\mathbb{R}^2$.\n2. Puntos extremos de la cicloide: $\\alpha(0) = (0, 0)$ y $\\alpha(2\\pi) = (2\\pi a, 0)$.\n3. Por el Teorema Fundamental de Integrales de Línea:\n$$W = [xy]_{(0,0)}^{(2\\pi a, 0)} = (2\\pi a)(0) - 0 = 0.$$',
    commonMistakes: 'Integrar $(1-\\cos t)(1-\\cos t) + (t-\\sin t)\\sin t$ a fuerza bruta arriesgando errores algebraicos cuando el campo es gradiente!'
  },
  {
    id: 't2-14', topic: 't2', level: 4,
    title: 'Demostración de Invariancia ante Reparametrización Positiva (PC6 2024-II #1a)',
    statement: 'Sean $\\alpha:[a,b]\\to\\mathbb{R}^n$ y $\\beta:[c,d]\\to\\mathbb{R}^n$ caminos equivalentes regulares a trozos que recorren $C$ en el mismo sentido ($\\beta = \\alpha \\circ \\varphi$, $\\varphi\' \\gt 0$). Demuestre que $\\int_\\alpha \\vec{F}\\cdot d\\alpha = \\int_\\beta \\vec{F}\\cdot d\\beta$.',
    hint: 'Aplica regla de la cadena a $\\beta(u) = \\alpha(\\varphi(u))$ y el teorema de sustitución en 1D.',
    solution: '1. Como $\\beta(u) = \\alpha(\\varphi(u))$ con $\\varphi(c)=a, \\varphi(d)=b$ y $\\varphi\'(u) \\gt 0$, por regla de la cadena $\\beta\'(u) = \\alpha\'(\\varphi(u))\\,\\varphi\'(u)$.\n2. Sustituimos en la integral sobre $\\beta$:\n$$\\int_c^d \\vec{F}(\\beta(u))\\cdot\\beta\'(u)\\,du = \\int_c^d \\left[\\vec{F}(\\alpha(\\varphi(u)))\\cdot\\alpha\'(\\varphi(u))\\right]\\varphi\'(u)\\,du.$$\n3. Haciendo el cambio de variable $t = \\varphi(u)$, $dt = \\varphi\'(u)\\,du$ (con $t(c)=a$, $t(d)=b$):\n$$= \\int_a^b \\vec{F}(\\alpha(t))\\cdot\\alpha\'(t)\\,dt = \\int_\\alpha \\vec{F}\\cdot d\\alpha. \\quad \\blacksquare$$',
    commonMistakes: 'Poner valor absoluto $|\\varphi\'(u)|$ en la integral vectorial (¡solo lleva valor absoluto en integrales escalares!).'
  },
  {
    id: 't2-15', topic: 't2', level: 4,
    title: 'Circulación en Espiral Logarítmica',
    statement: 'Calcule $\\int_C \\frac{x\\,dx + y\\,dy}{(x^2+y^2)^{3/2}}$ a lo largo de la espiral $\\alpha(t) = (e^t\\cos t, e^t\\sin t)$, $t \\in [0, 2\\pi]$.',
    hint: 'Nota que $r = \\sqrt{x^2+y^2} = e^t$, y $\\frac{x\\,dx + y\\,dy}{r^3} = \\frac{r\\,dr}{r^3} = d\\left(-\\frac{1}{r}\\right)$.',
    solution: '1. El integrando es el campo radial $\\vec{F}(x,y) = \\nabla\\left(-\\frac{1}{\\sqrt{x^2+y^2}}\\right)$ en $\\mathbb{R}^2 \\setminus \\{(0,0)\\}$.\n2. Los radios en los extremos son $r(0) = e^0 = 1$ y $r(2\\pi) = e^{2\\pi}$.\n3. Por el TFIL:\n$$I = \\left[-\\frac{1}{r}\\right]_{r=1}^{r=e^{2\\pi}} = -e^{-2\\pi} + 1 = 1 - e^{-2\\pi}.$$',
    commonMistakes: 'Creer que no se puede usar potencial porque el dominio es $\\mathbb{R}^2 \\setminus \\{(0,0)\\}$ (¡el potencial global $-1/r$ SÍ existe en todo $\\mathbb{R}^2 \\setminus \\{(0,0)\\}$!).'
  },
  {
    id: 't2-16', topic: 't2', level: 5,
    title: 'Desigualdad de Acotación Vectorial (PC6 2024-II #3b)',
    statement: 'Sea $C \\subset \\mathbb{R}^3$ descrita por un camino regular a trozos $\\alpha:[a,b]\\to\\mathbb{R}^3$, y $\\vec{F}$ continuo y acotado sobre $C$ con $M = \\max_{p \\in C} \\|\\vec{F}(p)\\|$. Demuestre que $\\left|\\int_C \\vec{F}\\cdot d\\alpha\\right| \\le M\\,\\ell(C)$.',
    hint: 'Combina la desigualdad triangular integral $\\left|\\int_a^b g\\right| \\le \\int_a^b |g|$ con la desigualdad de Cauchy-Schwarz $|\\vec{u}\\cdot\\vec{v}| \\le \\|\\vec{u}\\|\\|\\vec{v}\\|$.',
    solution: '1. Por definición en cada tramo regular $[t_{k-1}, t_k]$:\n$$\\left|\\int_C \\vec{F}\\cdot d\\alpha\\right| = \\left|\\sum_k \\int_{t_{k-1}}^{t_k} \\vec{F}(\\alpha(t))\\cdot\\alpha\'(t)\\,dt\\right| \\le \\sum_k \\int_{t_{k-1}}^{t_k} |\\vec{F}(\\alpha(t))\\cdot\\alpha\'(t)|\\,dt.$$\n2. Por la desigualdad de Cauchy-Schwarz en $\\mathbb{R}^3$:\n$$|\\vec{F}(\\alpha(t))\\cdot\\alpha\'(t)| \\le \\|\\vec{F}(\\alpha(t))\\|\\,\\|\\alpha\'(t)\\| \\le M\\,\\|\\alpha\'(t)\\|.$$\n3. Integrando sobre todos los tramos:\n$$\\left|\\int_C \\vec{F}\\cdot d\\alpha\\right| \\le M\\sum_k \\int_{t_{k-1}}^{t_k} \\|\\alpha\'(t)\\|\\,dt = M\\,\\ell(C). \\quad \\blacksquare$$',
    commonMistakes: 'Omitir el paso explícito de Cauchy-Schwarz o no mencionar la aditividad para curvas regulares a trozos.'
  },
  {
    id: 't2-17', topic: 't2', level: 5,
    title: 'Teorema de Conservación de la Energía Mecánica desde Segunda Ley de Newton',
    statement: 'Una partícula de masa $m$ se mueve según $\\vec{F}(\\alpha(t)) = m\\alpha\'\'(t)$ entre $t=a$ y $t=b$. Demuestre que el trabajo $\\int_C \\vec{F}\\cdot d\\vec{r}$ equivale al cambio de energía cinética $\\frac{1}{2}m\\|\\alpha\'(b)\\|^2 - \\frac{1}{2}m\\|\\alpha\'(a)\\|^2$, y que si $\\vec{F} = -\\nabla U$, entonces $E = \\frac{1}{2}m\\|v\\|^2 + U$ es constante.',
    hint: 'Usa la identidad $\\frac{d}{dt}\\|\\alpha\'(t)\\|^2 = 2\\alpha\'\'(t)\\cdot\\alpha\'(t)$.',
    solution: '1. Sustituimos $\\vec{F}(\\alpha(t)) = m\\alpha\'\'(t)$:\n$$W = \\int_a^b m\\alpha\'\'(t)\\cdot\\alpha\'(t)\\,dt = \\frac{m}{2}\\int_a^b \\frac{d}{dt}\\left(\\|\\alpha\'(t)\\|^2\\right)dt = \\frac{1}{2}m\\|\\alpha\'(b)\\|^2 - \\frac{1}{2}m\\|\\alpha\'(a)\\|^2.$$\n2. Si además $\\vec{F} = -\\nabla U$, por el TFIL $W = -U(\\alpha(b)) + U(\\alpha(a))$.\n3. Igualando ambas expresiones para todo $b$:\n$$\\frac{1}{2}m\\|\\alpha\'(b)\\|^2 + U(\\alpha(b)) = \\frac{1}{2}m\\|\\alpha\'(a)\\|^2 + U(\\alpha(a)) = \\text{cte}. \\quad \\blacksquare$$',
    commonMistakes: 'Escribir $\\frac{d}{dt}(\\alpha\'(t)^2) = 2\\alpha\'(t)$ olvidando la regla de la cadena con $\\alpha\'\'(t)$ y el producto interno.'
  },
  {
    id: 't2-18', topic: 't2', level: 5,
    title: 'Caracterización del Campo Nulo mediante Integrales de Línea',
    statement: 'Sea $\\vec{F}: U \\subset \\mathbb{R}^n \\to \\mathbb{R}^n$ continuo en un abierto $U$. Demuestre que si $\\int_C \\vec{F}\\cdot d\\vec{r} = 0$ para TODO segmento recto $C \\subset U$, entonces $\\vec{F}(x) = \\vec{0}$ para todo $x \\in U$.',
    hint: 'Fija $x_0 \\in U$ y un vector unitario $v$; integra sobre el segmento $\\alpha(t) = x_0 + tv$ ($t \\in [0, h]$) y divide entre $h \\to 0^+$.',
    solution: '1. Sea $x_0 \\in U$ y cualquier vector $v \\in \\mathbb{R}^n$. Como $U$ es abierto, existe $r \\gt 0$ tal que $B(x_0, r) \\subset U$.\n2. Para $0 \\lt h \\lt r/(\\|v\\|+1)$, el segmento $\\alpha_h(t) = x_0 + tv$, $t\\in[0,h]$, yace en $U$. Por hipótesis:\n$$0 = \\frac{1}{h}\\int_0^h \\vec{F}(x_0 + tv)\\cdot v\\,dt.$$\n3. Como $t \\mapsto \\vec{F}(x_0 + tv)\\cdot v$ es continua, por el Teorema Fundamental del Cálculo tomando $h \\to 0^+$ obtenemos $\\vec{F}(x_0)\\cdot v = 0$.\n4. Eligiendo $v = \\vec{F}(x_0)$ resulta $\\|\\vec{F}(x_0)\\|^2 = 0 \\implies \\vec{F}(x_0) = \\vec{0}$. $\\blacksquare$',
    commonMistakes: 'Confundir «cero en toda curva cerrada» (implica $\\vec{F} = \\nabla\\varphi$) con «cero en todo segmento abierto» (implica $\\vec{F} \\equiv \\vec{0}$!).'
  },

  // ============================================================================
  // SUBTEMA 3: CONJUNTOS CONVEXOS Y CAMPOS GRADIENTES (18 EJERCICIOS)
  // ============================================================================
  {
    id: 't3-01', topic: 't3', level: 0,
    title: 'Prueba Rápida de Derivadas Cruzadas en $\\mathbb{R}^2$',
    statement: 'Determine si $\\vec{F}(x,y) = (2xy + 3,\\; x^2 - 4y)$ es un campo gradiente en $\\mathbb{R}^2$.',
    hint: 'Verifica que $\\mathbb{R}^2$ es abierto convexo y compara $P_y$ con $Q_x$.',
    solution: '1. $P(x,y) = 2xy + 3$, $Q(x,y) = x^2 - 4y$, ambas $C^\\infty(\\mathbb{R}^2)$.\n2. Derivadas cruzadas: $P_y = 2x$ y $Q_x = 2x \\implies P_y = Q_x$.\n3. Como $\\mathbb{R}^2$ es abierto y convexo, por condición suficiente $\\vec{F}$ SÍ es un campo gradiente ($\\varphi = x^2y + 3x - 2y^2$).',
    commonMistakes: 'Derivar $P$ respecto a $x$ y $Q$ respecto a $y$ (eso da la divergencia, no el rotacional!).'
  },
  {
    id: 't3-02', topic: 't3', level: 0,
    title: 'Detectar un Campo No Conservativo (PC6 2026-I #1a)',
    statement: 'Justifique si la integral $\\int_C (y^2\\,dx + x\\,dy)$ es independiente del camino entre $(-5,-3)$ y $(0,2)$.',
    hint: 'Calcula $P_y$ y $Q_x$ para $\\vec{F} = (y^2, x)$ en $\\mathbb{R}^2$.',
    solution: '1. $P(x,y) = y^2 \\implies P_y = 2y$; $Q(x,y) = x \\implies Q_x = 1$.\n2. Como $2y \\neq 1$ en $\\mathbb{R}^2$, falla la condición necesaria de Schwarz.\n3. Por tanto $\\vec{F}$ NO es conservativo y la integral DEPENDE de la trayectoria (afirmación FALSA).',
    commonMistakes: 'Ver que $2y = 1$ en la recta $y = 1/2$ y creer que eso basta (debe cumplirse idénticamente en TODO el abierto!).'
  },
  {
    id: 't3-03', topic: 't3', level: 0,
    title: 'Identificar Conjuntos Convexos y Estrellados',
    statement: 'Clasifique cuáles de los siguientes conjuntos son convexos: (a) $B((0,0), 2)$, (b) $\\{(x,y) : 1 \\lt x^2+y^2 \\lt 4\\}$, (c) $\\{(x,y) : x \\gt 0, y \\gt 0\\}$.',
    hint: 'Toma dos puntos en el conjunto y revisa si el segmento recto que los une puede salirse del conjunto.',
    solution: '1. **(a) Convexo:** Por desigualdad triangular, $\\|(1-t)u + tv\\| \\le (1-t)\\|u\\| + t\\|v\\| \\lt 2$.\n2. **(b) NO convexo:** Los puntos $(1.5, 0)$ y $(-1.5, 0)$ están en el anillo, pero su punto medio $(0,0)$ no pertenece al anillo.\n3. **(c) Convexo:** Si $x_1, x_2 \\gt 0$ y $y_1, y_2 \\gt 0$, toda combinación convexa mantiene ambas coordenadas estrictamente positivas.',
    commonMistakes: 'Confundir conexo con convexo (el anillo (b) es conexo, pero NO convexo ni simplemente conexo).'
  },
  {
    id: 't3-04', topic: 't3', level: 1,
    title: 'Hallar Parámetro para Campo Conservativo en $\\mathbb{R}^2$',
    statement: 'Halle el valor de $k \\in \\mathbb{R}$ para que $\\vec{F}(x,y) = (e^x\\cos y + kxy^2,\\; -e^x\\sin y + 6x^2y)$ sea un campo gradiente en $\\mathbb{R}^2$.',
    hint: 'Iguala $P_y = Q_x$ en todo $\\mathbb{R}^2$.',
    solution: '1. $P_y = -e^x\\sin y + 2kxy$.\n2. $Q_x = -e^x\\sin y + 12xy$.\n3. Igualando: $2kxy = 12xy\\; \\forall(x,y) \\iff 2k = 12 \\iff k = 6$.\n4. Como $\\mathbb{R}^2$ es convexo, $k = 6$ es condición necesaria y suficiente.',
    commonMistakes: 'Olvidar comprobar la convexidad del dominio $\\mathbb{R}^2$ al concluir la suficiencia.'
  },
  {
    id: 't3-05', topic: 't3', level: 1,
    title: 'Rotacional Nulo en $\\mathbb{R}^3$',
    statement: 'Verifique que $\\vec{F}(x,y,z) = (yz + 2x,\\; xz - 3y^2,\\; xy + 5)$ es un campo gradiente en $\\mathbb{R}^3$ y halle un potencial $\\varphi$.',
    hint: 'Comprueba las 3 igualdades $P_y=Q_x$, $P_z=R_x$, $Q_z=R_y$ e integra parcialmente.',
    solution: '1. Derivadas cruzadas: $P_y = z = Q_x$, $P_z = y = R_x$, $Q_z = x = R_y$, luego $\\operatorname{rot}\\vec{F} = \\vec{0}$ en el convexo $\\mathbb{R}^3$.\n2. Integración parcial:\n$$\\varphi_x = yz + 2x \\implies \\varphi = xyz + x^2 + g(y,z).$$\n3. $\\varphi_y = xz + g_y = xz - 3y^2 \\implies g_y = -3y^2 \\implies g(y,z) = -y^3 + h(z)$.\n4. $\\varphi_z = xy + h\'(z) = xy + 5 \\implies h(z) = 5z + C$.\n5. Potencial: $\\varphi(x,y,z) = xyz + x^2 - y^3 + 5z + C$.',
    commonMistakes: 'Verificar solo $P_y = Q_x$ olvidando las otras dos parejas en $\\mathbb{R}^3$.'
  },
  {
    id: 't3-06', topic: 't3', level: 1,
    title: 'Campo Gradiente en un Dominio Semiplano Convexo',
    statement: 'Demuestre que $\\vec{F}(x,y) = (\\ln y + \\frac{1}{x},\\; \\frac{x}{y} + 2y)$ es conservativo en $U = \\{(x,y) : x \\gt 0, y \\gt 0\\}$.',
    hint: '$U$ (el primer cuadrante abierto) es convexo; revisa $P_y = Q_x$.',
    solution: '1. En $U = (0,\\infty)\\times(0,\\infty)$, $\\vec{F} \\in C^\\infty(U)$ y $U$ es abierto convexo.\n2. $P_y = \\frac{1}{y}$ y $Q_x = \\frac{1}{y}$, luego $P_y = Q_x$ en todo $U$.\n3. Por la condición suficiente en convexos, $\\vec{F}$ es gradiente en $U$ (con $\\varphi(x,y) = x\\ln y + \\ln x + y^2$).',
    commonMistakes: 'No restringirse al dominio $x \\gt 0, y \\gt 0$ donde $\\ln y$ y $1/x$ están bien definidos y son $C^1$.'
  },
  {
    id: 't3-07', topic: 't3', level: 2,
    title: 'Ajuste de 4 Parámetros en Campo Conservativo 3D (PC6 2026-I #1b)',
    statement: 'Si $\\vec{F}(x,y,z) = (2xy^m z + z^2 - 2y^n + 3m,\\; x^2 z - 4xy + p,\\; x^{m+p}y + 2x^r z - n)$ es conservativo en $\\mathbb{R}^3$, demuestre que $m + n + p + r = 5$.',
    hint: 'Iguala $P_y = Q_x$, $Q_z = R_y$ y $P_z = R_x$ comparando exponentes y coeficientes.',
    solution: '1. $P_y = Q_x \\implies 2mxy^{m-1}z - 2ny^{n-1} = 2xz - 4y$ en todo $\\mathbb{R}^3$. Comparando términos: $m = 1$ y $n = 2$.\n2. $Q_z = R_y \\implies x^2 = x^{m+p} \\implies m + p = 2 \\implies p = 1$.\n3. $P_z = R_x \\implies 2xy^m + 2z = (m+p)x^{m+p-1}y + 2rx^{r-1}z$. Con $m=1, p=1$: $2xy + 2z = 2xy + 2rx^{r-1}z \\implies r = 1$.\n4. Suma: $m + n + p + r = 1 + 2 + 1 + 1 = 5$. (VERDADERO).',
    commonMistakes: 'Dejar sin revisar la tercera ecuación $P_z = R_x$ para despejar $r$.'
  },
  {
    id: 't3-08', topic: 't3', level: 2,
    title: 'Convexidad de la Intersección de Convexos',
    statement: 'Demuestre que si $\\{C_i\\}_{i \\in I}$ es una familia arbitraria de subconjuntos convexos de $\\mathbb{R}^n$, entonces su intersección $C = \\bigcap_{i \\in I} C_i$ también es convexa.',
    hint: 'Toma $x, y \\in C$ y $t \\in [0,1]$; por definición $x, y \\in C_i$ para todo $i \\in I$.',
    solution: '1. Sean $x, y \\in C = \\bigcap_{i \\in I} C_i$ y $t \\in [0,1]$.\n2. Para cada índice $i \\in I$, se cumple $x, y \\in C_i$. Como cada $C_i$ es convexo, $(1-t)x + ty \\in C_i$.\n3. Como esto vale para todo $i \\in I$, $(1-t)x + ty \\in \\bigcap_{i \\in I} C_i = C$. Luego $C$ es convexo. $\\blacksquare$',
    commonMistakes: 'Afirmar que la UNIÓN de convexos también es convexa (falso: dos discos disjuntos no forman un conjunto convexo).'
  },
  {
    id: 't3-09', topic: 't3', level: 2,
    title: 'Potencial de un Campo Radial General en $\\mathbb{R}^3 \\setminus \\{\\vec{0}\\}$',
    statement: 'Sea $\\vec{F}(\\vec{r}) = \\frac{\\vec{r}}{\\|\\vec{r}\\|^p}$ ($p \\in \\mathbb{R}$) en $U = \\mathbb{R}^3 \\setminus \\{\\vec{0}\\}$. Pruebe que $\\vec{F}$ es conservativo hallando su potencial explícito para $p \\neq 2$ y para $p = 2$.',
    hint: 'Busca $\\varphi(\\vec{r}) = g(r)$ con $r = \\|\\vec{r}\\|$, sabiendo que $\\nabla r = \\frac{\\vec{r}}{r}$.',
    solution: '1. Por regla de la cadena, $\\nabla g(r) = g\'(r)\\frac{\\vec{r}}{r}$. Queremos $\\frac{g\'(r)}{r} = r^{-p} \\iff g\'(r) = r^{1-p}$.\n2. **Caso $p \\neq 2$:** $g(r) = \\frac{r^{2-p}}{2-p} + C$, es decir $\\varphi(x,y,z) = \\frac{(x^2+y^2+z^2)^{1 - p/2}}{2-p} + C$.\n3. **Caso $p = 2$:** $g(r) = \\ln r + C = \\frac{1}{2}\\ln(x^2+y^2+z^2) + C$.\n4. En ambos casos $\\nabla\\varphi = \\vec{F}$ en todo $\\mathbb{R}^3 \\setminus \\{\\vec{0}\\}$. $\\blacksquare$',
    commonMistakes: 'Dividir entre $2 - p$ olvidando separar el caso logarítmico $p = 2$.'
  },
  {
    id: 't3-10', topic: 't3', level: 3,
    title: 'Trampa Clásica V/F: $P_y = Q_x \\implies$ Conservativo? (PC6 2025-I #1b)',
    statement: 'Justifique la veracidad o falsedad: «Todo campo vectorial $\\vec{F}(x,y) = (P, Q)$ de clase $C^1$ que satisface $\\frac{\\partial P}{\\partial y} = \\frac{\\partial Q}{\\partial x}$ en su dominio abierto es conservativo».',
    hint: 'Sin especificar la topología del dominio, exhibe el campo del vórtice en $\\mathbb{R}^2 \\setminus \\{(0,0)\\}$.',
    solution: '1. **FALSO.** La condición $P_y = Q_x$ es solo necesaria, pero NO suficiente si el dominio tiene agujeros (no es simplemente conexo).\n2. **Contraejemplo canónico:** $\\vec{F}(x,y) = \\left(\\frac{-y}{x^2+y^2},\\; \\frac{x}{x^2+y^2}\\right)$ en $U = \\mathbb{R}^2 \\setminus \\{(0,0)\\}$.\n3. En todo $U$ se cumple $P_y = \\frac{y^2 - x^2}{(x^2+y^2)^2} = Q_x$.\n4. Sin embargo, sobre $C: x^2+y^2 = 1$ orientada positivamente, $\\oint_C \\vec{F}\\cdot d\\vec{r} = \\int_0^{2\\pi} 1\\,dt = 2\\pi \\neq 0$, luego $\\vec{F}$ NO es conservativo. $\\blacksquare$',
    commonMistakes: 'Marcar VERDADERO olvidando que el dominio abierto no fue especificado como convexo o simplemente conexo.'
  },
  {
    id: 't3-11', topic: 't3', level: 3,
    title: 'Campo Conservativo en el Plano Cortado (Estrellado)',
    statement: 'Sea $U = \\mathbb{R}^2 \\setminus \\{(x,0) : x \\le 0\\}$ (el plano sin el semieje negativo $X$). Demuestre que $U$ es estrellado respecto a $(1,0)$ y deduzca que el vórtice $\\vec{V}(x,y) = \\left(\\frac{-y}{x^2+y^2}, \\frac{x}{x^2+y^2}\\right)$ SÍ es conservativo en $U$.',
    hint: 'Comprueba que para cualquier $(x,y) \\in U$, el segmento $(1-t)(1,0) + t(x,y)$ nunca toca el rayo $\\{y=0, x\\le 0\\}$.',
    solution: '1. Sea $(x,y) \\in U$ y $t \\in [0,1]$. El punto del segmento es $p(t) = (1-t + tx,\\; ty)$.\n2. Si $y \\neq 0$: para $t \\in (0,1]$ se tiene $ty \\neq 0$ (no está en el eje $X$), y para $t=0$ es $(1,0) \\in U$.\n3. Si $y = 0$: como $(x,0) \\in U$, necesariamente $x \\gt 0$, luego $1-t+tx \\gt 0$ para todo $t\\in[0,1]$, así que $p(t) \\in U$. Por tanto $U$ es estrellado respecto a $(1,0)$.\n4. Como $\\vec{V} \\in C^\\infty(U)$ cumple $P_y = Q_x$ en el abierto estrellado $U$, por el Lema de Poincaré $\\vec{V}$ es conservativo en $U$ (su potencial explícito es $\\varphi(x,y) = \\operatorname{atan2}(y,x) \\in (-\\pi, \\pi)$). $\\blacksquare$',
    commonMistakes: 'Creer que el vórtice nunca es conservativo en ningún abierto: basta cortar un rayo desde el origen para impedir que los lazos rodeen $(0,0)$!'
  },
  {
    id: 't3-12', topic: 't3', level: 3,
    title: 'Campos Lineales Simétricos en $\\mathbb{R}^n$',
    statement: 'Sea $A \\in \\mathbb{R}^{n\\times n}$ una matriz constante y $\\vec{F}(x) = Ax$. Demuestre que $\\vec{F}$ es un campo gradiente en $\\mathbb{R}^n$ si y solo si $A$ es simétrica ($A^T = A$), y halle su potencial cuadrático.',
    hint: 'La matriz jacobiana de $\\vec{F}(x) = Ax$ es $D\\vec{F}(x) = A$.',
    solution: '1. Las componentes son $F_i(x) = \\sum_{k=1}^n a_{ik}x_k$, luego $\\frac{\\partial F_i}{\\partial x_j} = a_{ij}$.\n2. Como $\\mathbb{R}^n$ es convexo, $\\vec{F}$ es gradiente $\\iff \\frac{\\partial F_i}{\\partial x_j} = \\frac{\\partial F_j}{\\partial x_i}\\; \\forall i,j \\iff a_{ij} = a_{ji} \\iff A^T = A$.\n3. Cuando $A^T = A$, la forma cuadrática $\\varphi(x) = \\frac{1}{2} x^T A x$ cumple $\\nabla\\varphi(x) = \\frac{1}{2}(A + A^T)x = Ax = \\vec{F}(x)$. $\\blacksquare$',
    commonMistakes: 'Olvidar el factor $\\frac{1}{2}$ en el potencial $\\varphi(x) = \\frac{1}{2}x^T A x$.'
  },
  {
    id: 't3-13', topic: 't3', level: 4,
    title: 'Subconjunto Convexo de una Función Convexa (Subnivel)',
    statement: 'Sea $f: \\mathbb{R}^n \\to \\mathbb{R}$ una función convexa (es decir, $f((1-t)x+ty) \\le (1-t)f(x) + tf(y)$). Demuestre que para todo $c \\in \\mathbb{R}$, el conjunto de subnivel $S_c = \\{x \\in \\mathbb{R}^n : f(x) \\lt c\\}$ es convexo.',
    hint: 'Si $f(x) \\lt c$ y $f(y) \\lt c$, acota $(1-t)f(x) + tf(y)$.',
    solution: '1. Sean $x, y \\in S_c$ y $t \\in [0,1]$. Entonces $f(x) \\lt c$ y $f(y) \\lt c$.\n2. Por convexidad de $f$:\n$$f((1-t)x + ty) \\le (1-t)f(x) + tf(y) \\lt (1-t)c + tc = c.$$\n3. Luego $(1-t)x + ty \\in S_c$, probando que $S_c$ es convexo. $\\blacksquare$',
    commonMistakes: 'Confundir el conjunto de subnivel $\\{f \\lt c\\}$ (convexo) con la curva de nivel $\\{f = c\\}$ (ej. $x^2+y^2=1$ NO es convexo).'
  },
  {
    id: 't3-14', topic: 't3', level: 4,
    title: 'Producto de un Campo Gradiente por una Función Escalar',
    statement: 'Sean $f, g \\in C^2(\\mathbb{R}^3)$ con $\\nabla f$ y $\\nabla g$ no paralelos. Demuestre que el campo $\\vec{F} = g\\,\\nabla f$ es conservativo si y solo si $\\nabla g \\times \\nabla f = \\vec{0}$ (es decir, $g$ es localmente función de $f$).',
    hint: 'Aplica la identidad vectorial $\\nabla \\times (g\\vec{A}) = \\nabla g \\times \\vec{A} + g(\\nabla \\times \\vec{A})$.',
    solution: '1. Calculamos el rotacional usando la regla del producto:\n$$\\nabla \\times (g\\,\\nabla f) = \\nabla g \\times \\nabla f + g(\\nabla \\times \\nabla f).$$\n2. Como $f \\in C^2$, $\\nabla \\times \\nabla f = \\vec{0}$ idénticamente, luego $\\nabla \\times \\vec{F} = \\nabla g \\times \\nabla f$.\n3. Siendo $\\mathbb{R}^3$ convexo, $\\vec{F}$ es conservativo $\\iff \\nabla \\times \\vec{F} = \\vec{0} \\iff \\nabla g \\times \\nabla f = \\vec{0}$. $\\blacksquare$',
    commonMistakes: 'Asumir que multiplicar un campo conservativo por cualquier escalar variable $g(x,y,z)$ preserva la propiedad conservativa (falso en general!).'
  },
  {
    id: 't3-15', topic: 't3', level: 4,
    title: 'Fórmula de Poincaré Aplicada Explícitamente',
    statement: 'Use la fórmula constructiva de Poincaré $\\varphi(x,y) = \\int_0^1 \\vec{F}(tx, ty)\\cdot(x,y)\\,dt$ para hallar el potencial de $\\vec{F}(x,y) = (3x^2y + y^3,\\; x^3 + 3xy^2)$ en $\\mathbb{R}^2$.',
    hint: 'Observa que $\\vec{F}$ es homogéneo de grado $3$, así que $t^3$ sale inmediatamente de la integral.',
    solution: '1. Evaluamos $\\vec{F}(tx, ty) = t^3(3x^2y + y^3,\\; x^3 + 3xy^2)$.\n2. Producto punto con $(x,y)$:\n$$\\vec{F}(tx, ty)\\cdot(x,y) = t^3(3x^3y + xy^3 + x^3y + 3xy^3) = 4t^3(x^3y + xy^3).$$\n3. Integrando en $t \\in [0,1]$:\n$$\\varphi(x,y) = 4(x^3y + xy^3)\\int_0^1 t^3\\,dt = 4(x^3y + xy^3)\\cdot\\frac{1}{4} = x^3y + xy^3.$$ (Verificación: $\\nabla\\varphi = (3x^2y+y^3,\\; x^3+3xy^2) = \\vec{F}$).',
    commonMistakes: 'Olvidar que para campos homogéneos de grado $k$ la fórmula de Poincaré siempre da $\\varphi(x) = \\frac{1}{k+1}\\vec{F}(x)\\cdot x$ (identidad de Euler!).'
  },
  {
    id: 't3-16', topic: 't3', level: 5,
    title: 'Demostración del Lema de Poincaré en Abiertos Estrellados de $\\mathbb{R}^n$',
    statement: 'Sea $U \\subset \\mathbb{R}^n$ abierto estrellado respecto al origen $0 \\in U$ y $\\vec{F} \\in C^1(U, \\mathbb{R}^n)$ tal que $\\frac{\\partial F_i}{\\partial x_j} = \\frac{\\partial F_j}{\\partial x_i}$ en $U$. Demuestre que $\\varphi(x) = \\int_0^1 \\sum_{j=1}^n F_j(tx)\\,x_j\\,dt$ satisface $\\nabla\\varphi = \\vec{F}$.',
    hint: 'Deriva bajo el signo integral respecto a $x_i$ (Regla de Leibniz), reemplaza $\\partial_i F_j$ por $\\partial_j F_i$ y reconoce $\\frac{d}{dt}[t F_i(tx)]$.',
    solution: '1. Derivando $\\varphi(x)$ respecto a $x_i$ bajo el signo integral ($\\vec{F} \\in C^1$):\n$$\\frac{\\partial\\varphi}{\\partial x_i}(x) = \\int_0^1 \\left( F_i(tx) + \\sum_{j=1}^n t\\,\\frac{\\partial F_j}{\\partial x_i}(tx)\\,x_j \\right)dt.$$\n2. Usando la simetría de derivadas cruzadas $\\frac{\\partial F_j}{\\partial x_i}(tx) = \\frac{\\partial F_i}{\\partial x_j}(tx)$:\n$$\\frac{\\partial\\varphi}{\\partial x_i}(x) = \\int_0^1 \\left( F_i(tx) + t\\sum_{j=1}^n \\frac{\\partial F_i}{\\partial x_j}(tx)\\,x_j \\right)dt = \\int_0^1 \\frac{d}{dt}\\Big( t\\,F_i(tx) \\Big)\\,dt.$$\n3. Por el Teorema Fundamental del Cálculo:\n$$\\frac{\\partial\\varphi}{\\partial x_i}(x) = \\Big[ t\\,F_i(tx) \\Big]_{t=0}^{t=1} = 1\\cdot F_i(x) - 0 = F_i(x). \\quad \\blacksquare$$',
    commonMistakes: 'Olvidar aplicar la regla del producto al derivar $F_j(tx)\\,x_j$ (perdiendo el término $F_i(tx)$ cuando $j = i$).'
  },
  {
    id: 't3-17', topic: 't3', level: 5,
    title: 'Unicidad del Potencial en Abiertos Conexos vs. Disconexos',
    statement: 'Sea $U \\subset \\mathbb{R}^n$ un abierto conexo y $\\varphi_1, \\varphi_2 \\in C^1(U)$ tales que $\\nabla\\varphi_1 = \\nabla\\varphi_2$ en $U$. Pruebe que existe $c \\in \\mathbb{R}$ tal que $\\varphi_1 - \\varphi_2 \\equiv c$, y dé un contraejemplo cuando $U$ es disconexo.',
    hint: 'Aplica el Teorema del Valor Medio sobre segmentos rectos que conectan dos puntos mediante una poligonal en $U$.',
    solution: '1. Sea $\\psi = \\varphi_1 - \\varphi_2 \\in C^1(U)$, luego $\\nabla\\psi = \\vec{0}$ en $U$.\n2. Fija $x_0 \\in U$ y sea $c = \\psi(x_0)$. Como $U$ es abierto y conexo en $\\mathbb{R}^n$, es conexo por caminos poligonales: todo $x \\in U$ se une a $x_0$ por una cadena finita de segmentos $L_1, \\dots, L_m \\subset U$.\n3. En cada segmento $p(t) = a + t(b-a)$, $h(t) = \\psi(p(t))$ cumple $h\'(t) = \\nabla\\psi(p(t))\\cdot(b-a) = 0$, luego $\\psi(b) = \\psi(a)$. Encadenando resulta $\\psi(x) = \\psi(x_0) = c$ para todo $x \\in U$.\n4. **Contraejemplo disconexo:** En $U = \\{x \\lt 0\\} \\cup \\{x \\gt 0\\} \\subset \\mathbb{R}$, $\\psi(x) = 1$ si $x \\gt 0$ y $\\psi(x) = -1$ si $x \\lt 0$ tiene $\\psi\' \\equiv 0$ pero no es constante globalmente. $\\blacksquare$',
    commonMistakes: 'Asumir que todo abierto conexo es convexo (solo necesitas poligonales, no un único segmento directo!).'
  },
  {
    id: 't3-18', topic: 't3', level: 5,
    title: 'Invariancia de la Propiedad Conservativa bajo Difeomorfismos (Pullback)',
    statement: 'Sea $\\Phi: V \\to U$ un $C^2$-difeomorfismo entre abiertos de $\\mathbb{R}^n$ y $\\vec{F} = \\nabla\\varphi$ conservativo en $U$. Demuestre que el campo transformado $\\vec{G}(u) = [D\\Phi(u)]^T \\vec{F}(\\Phi(u))$ es conservativo en $V$ con potencial $\\psi = \\varphi \\circ \\Phi$.',
    hint: 'Aplica la regla de la cadena a $\\psi(u) = \\varphi(\\Phi(u))$ en forma matricial.',
    solution: '1. Por la regla de la cadena para $\\psi = \\varphi \\circ \\Phi$:\n$$D\\psi(u) = D\\varphi(\\Phi(u))\\,D\\Phi(u) = [\\nabla\\varphi(\\Phi(u))]^T D\\Phi(u).$$\n2. Transponiendo ambos lados para pasar del vector fila diferencial al vector columna gradiente:\n$$\\nabla\\psi(u) = [D\\psi(u)]^T = [D\\Phi(u)]^T \\nabla\\varphi(\\Phi(u)) = [D\\Phi(u)]^T \\vec{F}(\\Phi(u)) = \\vec{G}(u).$$\n3. Por tanto $\\vec{G} = \\nabla\\psi$ es conservativo en $V$. $\\blacksquare$',
    commonMistakes: 'Olvidar transponer la matriz jacobiana $[D\\Phi(u)]^T$ (el gradiente se transforma como covector!).'
  },

  // ============================================================================
  // SUBTEMA 4: INDEPENDENCIA DEL CAMINO, POTENCIALES Y EL VÓRTICE (18 EJERCICIOS)
  // ============================================================================
  {
    id: 't4-01', topic: 't4', level: 0,
    title: 'Evaluación Directa con el TFIL (PC6 2024-II #2)',
    statement: 'Sea $\\vec{F}(x,y) = (2x + y,\\; x)$ y $\\lambda$ cualquier camino $C^1$ desde $(1,2)$ hasta $(5,7)$. Calcule $\\int_\\lambda \\vec{F}\\cdot d\\vec{r}$.',
    hint: 'Verifica $P_y = 1 = Q_x$ en $\\mathbb{R}^2$, halla $\\varphi(x,y) = x^2 + xy$ y evalúa $\\varphi(5,7) - \\varphi(1,2)$.',
    solution: '1. $P_y = 1 = Q_x$ en el convexo $\\mathbb{R}^2$, luego $\\vec{F} = \\nabla\\varphi$.\n2. Potencial: $\\varphi_x = 2x + y \\implies \\varphi(x,y) = x^2 + xy + g(y)$. Derivando en $y$: $\\varphi_y = x + g\'(y) = x \\implies g(y) = C$. Elegimos $\\varphi(x,y) = x^2 + xy$.\n3. Por el TFIL:\n$$\\int_\\lambda \\vec{F}\\cdot d\\vec{r} = \\varphi(5,7) - \\varphi(1,2) = (25 + 35) - (1 + 2) = 60 - 3 = 57.$$',
    commonMistakes: 'Invertir los extremos calculando $\\varphi(1,2) - \\varphi(5,7) = -57$.'
  },
  {
    id: 't4-02', topic: 't4', level: 0,
    title: 'Circulación Nula de un Campo Conservativo sobre Curva Cerrada',
    statement: 'Sin parametrizar, calcule $\\oint_C (3x^2 y\\,dx + x^3\\,dy)$ donde $C$ es la elipse $\\frac{(x-2)^2}{9} + \\frac{(y+1)^2}{4} = 1$.',
    hint: 'Observa que $(3x^2y, x^3) = \\nabla(x^3 y)$ en todo $\\mathbb{R}^2$ y $C$ es cerrada.',
    solution: '1. $\\vec{F}(x,y) = (3x^2y, x^3) = \\nabla(x^3y)$ es conservativo en todo $\\mathbb{R}^2$.\n2. Como $C$ es una curva cerrada en $\\mathbb{R}^2$, por equivalencia de campos gradientes:\n$$\\oint_C (3x^2y\\,dx + x^3\\,dy) = 0.$$',
    commonMistakes: 'Parametrizar la elipse con $2+3\\cos t, -1+2\\sin t$ perdiendo tiempo innecesariamente.'
  },
  {
    id: 't4-03', topic: 't4', level: 0,
    title: 'Lectura de Integral de Línea desde Curvas de Nivel',
    statement: 'Una función $f \\in C^1(\\mathbb{R}^2)$ cumple $f(P) = 10$, $f(R) = 40$ y $f(Q) = 50$. Si $C_1$ va de $P$ a $Q$, $C_2$ de $P$ a $R$ y $C_3$ de $R$ a $Q$, calcule $\\int_{C_1} \\nabla f\\cdot d\\vec{r}$, $\\int_{C_2} \\nabla f\\cdot d\\vec{r}$ y $\\int_{C_3} \\nabla f\\cdot d\\vec{r}$.',
    hint: 'Aplica directamente $\\int_{A\\to B} \\nabla f\\cdot d\\vec{r} = f(B) - f(A)$ en cada tramo.',
    solution: '1. $\\int_{C_1} \\nabla f\\cdot d\\vec{r} = f(Q) - f(P) = 50 - 10 = 40$.\n2. $\\int_{C_2} \\nabla f\\cdot d\\vec{r} = f(R) - f(P) = 40 - 10 = 30$.\n3. $\\int_{C_3} \\nabla f\\cdot d\\vec{r} = f(Q) - f(R) = 50 - 40 = 10$.\n(Verificación: $\\int_{C_2} + \\int_{C_3} = 30 + 10 = 40 = \\int_{C_1}$).',
    commonMistakes: 'Creer que hacen falta las longitudes o ecuaciones de $C_1, C_2, C_3$ (solo importan los valores de nivel en los extremos!).'
  },
  {
    id: 't4-04', topic: 't4', level: 1,
    title: 'Construcción de Potencial Trigonométrico-Exponencial en $\\mathbb{R}^2$',
    statement: 'Halle la función potencial de $\\vec{F}(x,y) = (e^x\\sin y + 2y,\\; e^x\\cos y + 2x - 3y^2)$ y evalúe $\\int_C \\vec{F}\\cdot d\\vec{r}$ de $(0,0)$ a $(1, \\pi/2)$.',
    hint: 'Integra $P$ en $x$ y deriva respecto a $y$ para determinar $g(y)$.',
    solution: '1. $P_y = e^x\\cos y + 2 = Q_x$ en $\\mathbb{R}^2$ (convexo).\n2. $\\varphi(x,y) = \\int (e^x\\sin y + 2y)\\,dx = e^x\\sin y + 2xy + g(y)$.\n3. $\\varphi_y = e^x\\cos y + 2x + g\'(y) = e^x\\cos y + 2x - 3y^2 \\implies g\'(y) = -3y^2 \\implies g(y) = -y^3$.\n4. Potencial: $\\varphi(x,y) = e^x\\sin y + 2xy - y^3$.\n5. Integral:\n$$\\varphi(1,\\pi/2) - \\varphi(0,0) = \\left(e\\cdot 1 + \\pi - \\frac{\\pi^3}{8}\\right) - 0 = e + \\pi - \\frac{\\pi^3}{8}.$$',
    commonMistakes: 'Olvidar que $\\sin(\\pi/2)=1$ o perder el término $-y^3$ al omitir $+g(y)$.'
  },
  {
    id: 't4-05', topic: 't4', level: 1,
    title: 'Integral de Línea en $\\mathbb{R}^3$ por Independencia del Camino',
    statement: 'Calcule $\\int_C \\left((2x\\cos y)\\,dx + (z - x^2\\sin y)\\,dy + (y + 2z)\\,dz\\right)$ sobre cualquier curva suave desde $(1,0,2)$ hasta $(2,\\pi,1)$.',
    hint: 'Comprueba $\\operatorname{rot}\\vec{F} = \\vec{0}$ en $\\mathbb{R}^3$ y halla $\\varphi(x,y,z) = x^2\\cos y + yz + z^2$.',
    solution: '1. $P_y = -2x\\sin y = Q_x$, $P_z = 0 = R_x$, $Q_z = 1 = R_y$ en $\\mathbb{R}^3$.\n2. Potencial: $\\varphi(x,y,z) = x^2\\cos y + yz + z^2$.\n3. Evaluación:\n$$\\varphi(2,\\pi,1) - \\varphi(1,0,2) = (4(-1) + \\pi + 1) - (1(1) + 0 + 4) = (\\pi - 3) - 5 = \\pi - 8.$$',
    commonMistakes: 'Evaluar $\\cos\\pi = +1$ en vez de $-1$.'
  },
  {
    id: 't4-06', topic: 't4', level: 1,
    title: 'Circulación del Vórtice sobre Circunferencia Centrada en el Origen',
    statement: 'Calcule $\\oint_C \\frac{-y\\,dx + x\\,dy}{x^2 + y^2}$ a lo largo de la circunferencia $x^2 + y^2 = a^2$ ($a \\gt 0$) recorrida en sentido antihorario.',
    hint: 'Parametriza $x = a\\cos t$, $y = a\\sin t$ ($t \\in [0, 2\\pi]$) y observa que el radio $a$ se cancela completamente!',
    solution: '1. $x = a\\cos t$, $y = a\\sin t$, $dx = -a\\sin t\\,dt$, $dy = a\\cos t\\,dt$, $x^2+y^2 = a^2$.\n2. Sustituimos:\n$$\\frac{-y\\,dx + x\\,dy}{x^2+y^2} = \\frac{a^2\\sin^2 t + a^2\\cos^2 t}{a^2}\\,dt = dt.$$\n3. Integral:\n$$\\oint_C \\vec{V}\\cdot d\\vec{r} = \\int_0^{2\\pi} dt = 2\\pi.$$ (Independiente del radio $a \\gt 0$!).',
    commonMistakes: 'Multiplicar por $a^2$ como si fuera el campo $(-y, x)$ sin denominador.'
  },
  {
    id: 't4-07', topic: 't4', level: 2,
    title: 'Campo Conservativo en Dominio Perforado $\\mathbb{R}^2 \\setminus \\{(0,0)\\}$ (PC6 2025-II #4)',
    statement: 'Demuestre que $\\vec{F}(x,y) = \\left(\\frac{2x}{x^2+y^2} + 3x^2y,\\; \\frac{2y}{x^2+y^2} + x^3 - 2y\\right)$ es conservativo en $D = \\mathbb{R}^2 \\setminus \\{(0,0)\\}$ y encuentre su función potencial.',
    hint: 'Aunque $D$ tiene un agujero, no basta decir que no es simplemente conexo: busca directamente $\\varphi(x,y)$ integrando $\\frac{2x}{x^2+y^2}$ respecto a $x$!',
    solution: '1. Integramos la primera componente respecto a $x$ en $D = \\mathbb{R}^2 \\setminus \\{(0,0)\\}$:\n$$\\varphi(x,y) = \\int \\left(\\frac{2x}{x^2+y^2} + 3x^2y\\right)dx = \\ln(x^2+y^2) + x^3y + g(y).$$\n2. Derivamos respecto a $y$ e igualamos a $Q(x,y)$:\n$$\\varphi_y = \\frac{2y}{x^2+y^2} + x^3 + g\'(y) = \\frac{2y}{x^2+y^2} + x^3 - 2y \\implies g\'(y) = -2y \\implies g(y) = -y^2 + C.$$\n3. La función $\\varphi(x,y) = \\ln(x^2+y^2) + x^3y - y^2$ está bien definida y es $C^\\infty$ en TODO $D = \\mathbb{R}^2 \\setminus \\{(0,0)\\}$ (porque $x^2+y^2 \\gt 0$) y cumple $\\nabla\\varphi = \\vec{F}$. Por definición, $\\vec{F}$ es conservativo en $D$. $\\blacksquare$',
    commonMistakes: 'Decir «como $D$ tiene un agujero en $(0,0)$, $\\vec{F}$ no es conservativo» (error fatal de lógica!).'
  },
  {
    id: 't4-08', topic: 't4', level: 2,
    title: 'Vórtice sobre Curva Abierta en el Semiplano Derecho',
    statement: 'Evalúe $\\int_C \\frac{-y\\,dx + x\\,dy}{x^2+y^2}$ a lo largo de cualquier curva suave contenida en el semiplano $x \\gt 0$ que une $(1, -1)$ con $(\\sqrt{3}, 1)$.',
    hint: 'En $U = \\{x \\gt 0\\}$ (convexo!), $\\vec{V} = \\nabla(\\arctan(y/x))$ sí es un gradiente global.',
    solution: '1. En el semiplano abierto y convexo $U = \\{(x,y) : x \\gt 0\\}$, $\\varphi(x,y) = \\arctan(y/x)$ es $C^\\infty$ y cumple $\\nabla\\varphi = \\left(\\frac{-y}{x^2+y^2}, \\frac{x}{x^2+y^2}\\right)$.\n2. Por el TFIL:\n$$\\int_C \\vec{V}\\cdot d\\vec{r} = \\arctan\\left(\\frac{1}{\\sqrt{3}}\\right) - \\arctan(-1) = \\frac{\\pi}{6} - \\left(-\\frac{\\pi}{4}\\right) = \\frac{5\\pi}{12}.$$',
    commonMistakes: 'Restar en orden inverso o intentar aplicar $\\arctan(y/x)$ cuando la curva cruza el eje $x = 0$.'
  },
  {
    id: 't4-09', topic: 't4', level: 2,
    title: 'Mapa de Contorno y Diseño de Curva Abierta con Integral Cero (PC6 2025-II #2)',
    statement: 'En un mapa de contorno de $f \\in C^1(\\mathbb{R}^2)$, $P$ está en la curva de nivel $10$, $R$ en la $40$ y $Q$ en la $50$. $C_1$ une $P\\to Q$, $C_2$ une $P\\to R$ y $C_3$ une $R\\to Q$. (a) Ordene $A=\\int_{C_1}\\nabla f\\cdot d\\vec{r}$, $B=\\int_{C_2\\cup C_3}\\nabla f\\cdot d\\vec{r}$ y $C=\\int_{(C_2\\cup C_3)\\cup(-C_1)}\\nabla f\\cdot d\\vec{r}$. (b) Diseñe una curva abierta $C_4$ con $\\int_{C_4}\\nabla f\\cdot d\\vec{r}=0$.',
    hint: 'Observa que $(C_2\\cup C_3)\\cup(-C_1)$ es un lazo cerrado!',
    solution: '1. **(a)** Por independencia del camino, $A = f(Q)-f(P) = 40$ y $B = (f(R)-f(P)) + (f(Q)-f(R)) = 40$, luego $A = B = 40$. El camino $(C_2\\cup C_3)\\cup(-C_1)$ parte en $P$ y regresa a $P$ (curva cerrada), luego $C = f(P)-f(P) = 0$. Orden: $C = 0 \\lt A = B = 40$.\n2. **(b)** Elige dos puntos DISTINTOS $M$ y $N$ ubicados sobre la MISMA curva de nivel (por ejemplo ambos en el nivel $20$), y conéctalos mediante cualquier arco abierto $C_4$ (no cerrado). Por el TFIL, $\\int_{C_4} \\nabla f\\cdot d\\vec{r} = f(N) - f(M) = 20 - 20 = 0$.',
    commonMistakes: 'Creer que $C_4$ debe permanecer completamente encima de la curva de nivel (¡no es necesario! Puede subir y bajar libremente mientras empiece y termine en el mismo nivel).'
  },
  {
    id: 't4-10', topic: 't4', level: 3,
    title: 'Contraejemplo Oficial: Circulación Nula en Todos los Círculos $C_r$ (PC6 2024-II #1b)',
    statement: 'Determine si es verdadera o falsa: «Sea $\\vec{F} \\in C^1(\\mathbb{R}^2, \\mathbb{R}^2)$ tal que $\\oint_{C_r} \\vec{F}\\cdot d\\alpha = 0$ para toda circunferencia $C_r: x^2+y^2=r^2$ ($r \\gt 0$). Entonces $\\vec{F}$ es conservativo».',
    hint: 'Prueba el campo $\\vec{F}(x,y) = (xy, x^2)$ del solucionario oficial UNI 2024-II.',
    solution: '1. **FALSO.** La caracterización exige circulación nula en TODA curva cerrada, no solo en círculos centrados en el origen.\n2. **Contraejemplo:** $\\vec{F}(x,y) = (xy, x^2)$. No es conservativo porque $P_y = x \\neq 2x = Q_x$.\n3. Sobre $C_r$: $\\alpha(t) = (r\\cos t, r\\sin t)$, $\\alpha\'(t) = (-r\\sin t, r\\cos t)$, $t\\in[0,2\\pi]$:\n$$\\oint_{C_r} \\vec{F}\\cdot d\\alpha = \\int_0^{2\\pi} r^3(-\\cos t\\sin^2 t + \\cos^3 t)\\,dt = r^3\\left[-\\frac{\\sin^3 t}{3} + \\sin t - \\frac{\\sin^3 t}{3}\\right]_0^{2\\pi} = 0, \\quad \\forall r \\gt 0. \\quad \\blacksquare$$',
    commonMistakes: 'Confundir «para todo círculo $C_r$ centrado en el origen» con «para toda curva cerrada simple en $\\mathbb{R}^2$».'
  },
  {
    id: 't4-11', topic: 't4', level: 3,
    title: 'Separación en Parte Conservativa + Vórtice en una Elipse',
    statement: 'Calcule $\\oint_C \\left[\\left(e^x\\cos y - \\frac{3y}{x^2+y^2}\\right)dx + \\left(-e^x\\sin y + \\frac{3x}{x^2+y^2}\\right)dy\\right]$ sobre la elipse $4x^2 + 9y^2 = 36$ recorrida en sentido antihorario.',
    hint: 'Descompón $\\vec{F} = \\nabla(e^x\\cos y) + 3\\vec{V}$. La parte gradiente da $0$ y la elipse encierra al origen!',
    solution: '1. Descomponemos $\\vec{F} = \\vec{F}_1 + 3\\vec{V}$, donde $\\vec{F}_1 = \\nabla(e^x\\cos y)$ en todo $\\mathbb{R}^2$ y $\\vec{V} = \\left(\\frac{-y}{x^2+y^2}, \\frac{x}{x^2+y^2}\\right)$.\n2. Como $C$ es cerrada en $\\mathbb{R}^2$, $\\oint_C \\vec{F}_1\\cdot d\\vec{r} = 0$.\n3. Como la elipse $4x^2+9y^2=36$ encierra el origen $(0,0)$ con orientación positiva y $\\operatorname{rot}\\vec{V} = 0$ fuera de $(0,0)$, por deformación de contornos $\\oint_C \\vec{V}\\cdot d\\vec{r} = 2\\pi$.\n4. Total: $I = 0 + 3(2\\pi) = 6\\pi$.',
    commonMistakes: 'Intentar parametrizar $e^{3\\cos t}\\cos(2\\sin t)$ (integral no elemental!) en lugar de separar la parte conservativa.'
  },
  {
    id: 't4-12', topic: 't4', level: 3,
    title: 'Vórtice Desplazado fuera de la Curva Cerrada',
    statement: 'Calcule $\\oint_C \\frac{-(y-4)\\,dx + (x-3)\\,dy}{(x-3)^2 + (y-4)^2}$ a lo largo de la circunferencia $x^2 + y^2 = 4$ orientada positivamente.',
    hint: '¿Dónde está la singularidad? $(3,4)$ tiene distancia $5 \\gt 2$ al origen!',
    solution: '1. La única singularidad del campo es $p_0 = (3, 4)$, que verifica $3^2 + 4^2 = 25 \\gt 4$, es decir $p_0$ está COMPLETAMENTE FUERA del disco $D = \\{x^2+y^2 \\le 4\\}$.\n2. En un abierto convexo que contiene a $D$ (por ejemplo el disco $B((0,0), 4)$), el campo es $C^\\infty$ y cumple $Q_x = P_y$.\n3. Por lo tanto el campo es conservativo en $B((0,0), 4)$ (o por Green en $D$) y su circulación es:\n$$\\oint_C \\vec{F}\\cdot d\\vec{r} = 0.$$',
    commonMistakes: 'Responder mecánicamente $2\\pi$ al ver la forma del vórtice sin comprobar si la singularidad $(3,4)$ está DENTRO o FUERA de $C$!'
  },
  {
    id: 't4-13', topic: 't4', level: 4,
    title: 'Vórtice Elíptico con Denominador $a^2 x^2 + b^2 y^2$',
    statement: 'Calcule $\\oint_C \\frac{-y\\,dx + x\\,dy}{4x^2 + 9y^2}$ sobre cualquier curva cerrada simple $C$ orientada positivamente que encierre al origen $(0,0)$.',
    hint: 'Verifica que $Q_x = P_y$ en $\\mathbb{R}^2\\setminus\\{(0,0)\\}$ y deforma $C$ a la elipse $4x^2 + 9y^2 = 1$ ($x = \\frac{1}{2}\\cos t, y = \\frac{1}{3}\\sin t$)!',
    solution: '1. Verificamos derivadas cruzadas fuera del origen:\n$$P_y = \\frac{-(4x^2+9y^2) - (-y)(18y)}{(4x^2+9y^2)^2} = \\frac{9y^2 - 4x^2}{(4x^2+9y^2)^2}, \\quad Q_x = \\frac{(4x^2+9y^2) - x(8x)}{(4x^2+9y^2)^2} = \\frac{9y^2 - 4x^2}{(4x^2+9y^2)^2}.$$\n2. Como $Q_x - P_y = 0$ en $\\mathbb{R}^2\\setminus\\{(0,0)\\}$, por deformación de contornos (Green múltiplemente conexo) podemos sustituir $C$ por la elipse $E: 4x^2 + 9y^2 = 1$ orientada positivamente: $x = \\frac{1}{2}\\cos t$, $y = \\frac{1}{3}\\sin t$, $t \\in [0, 2\\pi]$.\n3. En $E$, el denominador vale $1$ y:\n$$-y\\,dx + x\\,dy = -\\left(\\frac{1}{3}\\sin t\\right)\\left(-\\frac{1}{2}\\sin t\\,dt\\right) + \\left(\\frac{1}{2}\\cos t\\right)\\left(\\frac{1}{3}\\cos t\\,dt\\right) = \\frac{1}{6}\\,dt.$$\n4. Por tanto $\\oint_C = \\int_0^{2\\pi} \\frac{1}{6}\\,dt = \\frac{\\pi}{3}$ (en general, para $a^2x^2+b^2y^2$ da $\\frac{2\\pi}{ab}$!).',
    commonMistakes: 'Deformar a una circunferencia $x^2+y^2=1$ (eso deja $4\\cos^2 t + 9\\sin^2 t$ en el denominador, mucho más difícil) en lugar de elegir la elipse adaptada $4x^2+9y^2=1$!'
  },
  {
    id: 't4-14', topic: 't4', level: 4,
    title: 'Suma de Dos Vórtices con Singularidades Distintas',
    statement: 'Calcule $\\oint_C \\left( \\frac{-(y)\\,dx + (x-1)\\,dy}{(x-1)^2 + y^2} - 2\\frac{-(y)\\,dx + (x+1)\\,dy}{(x+1)^2 + y^2} \\right)$ donde $C$ es la circunferencia $x^2 + y^2 = 9$ recorrida positivamente.',
    hint: 'Ambos polos $(1,0)$ y $(-1,0)$ están dentro del círculo de radio $3$: usa linealidad!',
    solution: '1. El primer sumando es un vórtice centrado en $p_1 = (1,0) \\in \\operatorname{int}(C)$, cuya circulación antihoraria alrededor de $C$ vale $+2\\pi$.\n2. El segundo sumando es $-2$ veces un vórtice centrado en $p_2 = (-1,0) \\in \\operatorname{int}(C)$, cuya circulación vale $-2(2\\pi) = -4\\pi$.\n3. Por linealidad de la integral de línea:\n$$I = 2\\pi - 4\\pi = -2\\pi.$$',
    commonMistakes: 'Olvidar que los polos están ambos dentro del radio $3$, o perder el signo menos del segundo término.'
  },
  {
    id: 't4-15', topic: 't4', level: 4,
    title: 'Curva con Índice de Enrollamiento Mayor que Uno',
    statement: 'Calcule $\\int_C \\frac{-y\\,dx + x\\,dy}{x^2+y^2}$ sobre la curva $\\alpha(t) = ((2 + \\cos 3t)\\cos 2t,\\; (2 + \\cos 3t)\\sin 2t)$ para $t \\in [0, 2\\pi]$.',
    hint: 'Escribe $\\alpha(t)$ en polares: $r(t) = 2 + \\cos 3t \\ge 1 \\gt 0$ y $\\theta(t) = 2t$!',
    solution: '1. En coordenadas polares, $\\frac{-y\\,dx + x\\,dy}{x^2+y^2} = d\\theta = \\theta\'(t)\\,dt$ siempre que $r(t) \\gt 0$.\n2. Aquí $r(t) = 2 + \\cos(3t) \\ge 1 \\gt 0$ para todo $t$, luego la curva jamás toca el origen, y su ángulo es $\\theta(t) = 2t$.\n3. Integrando:\n$$\\int_C \\vec{V}\\cdot d\\vec{r} = \\int_0^{2\\pi} \\theta\'(t)\\,dt = \\theta(2\\pi) - \\theta(0) = 4\\pi - 0 = 4\\pi.$$ (La curva da exactamente $2$ vueltas antihorarias alrededor del origen!).',
    commonMistakes: 'Asumir que toda curva cerrada alrededor del origen da $2\\pi$ (si da $k$ vueltas, da $2\\pi k$!).'
  },
  {
    id: 't4-16', topic: 't4', level: 5,
    title: 'Demostración del Teorema Fundamental de Integrales de Línea (PC6 2024-II #3a)',
    statement: 'Sea $f \\in C^1(U, \\mathbb{R})$ en un abierto $U \\subset \\mathbb{R}^3$ y $\\alpha:[a,b]\\to U$ una trayectoria de clase $C^1$ a trozos. Demuestre rigurosamente que $\\int_\\alpha \\nabla f\\cdot d\\alpha = f(\\alpha(b)) - f(\\alpha(a))$.',
    hint: 'Define $h(t) = f(\\alpha(t))$ en cada subintervalo suave $[t_{k-1}, t_k]$, aplica la regla de la cadena y suma telescópicamente.',
    solution: '1. Sea $a = t_0 \\lt t_1 \\lt \\dots \\lt t_m = b$ la partición donde $\\alpha$ es de clase $C^1$ en cada $[t_{k-1}, t_k]$.\n2. En cada subintervalo definimos $h(t) = (f \\circ \\alpha)(t) \\in C^1([t_{k-1}, t_k])$. Por la regla de la cadena:\n$$h\'(t) = \\nabla f(\\alpha(t)) \\cdot \\alpha\'(t).$$\n3. Por el Teorema Fundamental del Cálculo en una variable:\n$$\\int_{t_{k-1}}^{t_k} \\nabla f(\\alpha(t))\\cdot\\alpha\'(t)\\,dt = \\int_{t_{k-1}}^{t_k} h\'(t)\\,dt = f(\\alpha(t_k)) - f(\\alpha(t_{k-1})).$$\n4. Sumando desde $k = 1$ hasta $m$, los términos intermedios se cancelan en suma telescópica:\n$$\\int_\\alpha \\nabla f\\cdot d\\alpha = \\sum_{k=1}^m \\big[f(\\alpha(t_k)) - f(\\alpha(t_{k-1}))\\big] = f(\\alpha(b)) - f(\\alpha(a)). \\quad \\blacksquare$$',
    commonMistakes: 'Demostrarlo solo para una curva $C^1$ sin mencionar cómo se extiende mediante suma telescópica a curvas $C^1$ a trozos.'
  },
  {
    id: 't4-17', topic: 't4', level: 5,
    title: 'Demostración: Independencia del Camino Implica $\\vec{F} = \\nabla\\varphi$',
    statement: 'Sea $U \\subset \\mathbb{R}^n$ abierto conexo y $\\vec{F} \\in C(U, \\mathbb{R}^n)$ tal que $\\int_C \\vec{F}\\cdot d\\vec{r}$ es independiente del camino en $U$. Demuestre que existe $\\varphi \\in C^1(U)$ tal que $\\nabla\\varphi = \\vec{F}$.',
    hint: 'Fija $x_0 \\in U$, define $\\varphi(x) = \\int_{x_0}^x \\vec{F}\\cdot d\\vec{r}$ y calcula $\\frac{\\partial\\varphi}{\\partial x_i}(x)$ prolongando el camino con un pequeño segmento paralelo a $e_i$.',
    solution: '1. Fija $x_0 \\in U$. Como $U$ es abierto y conexo, existe una poligonal en $U$ desde $x_0$ hasta cualquier $x \\in U$; por independencia del camino queda bien definida $\\varphi(x) = \\int_{x_0}^x \\vec{F}\\cdot d\\vec{r}$.\n2. Fija $x \\in U$ y $i \\in \\{1,\\dots,n\\}$. Como $U$ es abierto, existe $\\delta \\gt 0$ tal que $x + te_i \\in U$ para $|t| \\lt \\delta$.\n3. Unimos $x_0$ con $x+he_i$ concatenando un camino $C_1$ de $x_0$ a $x$ con el segmento $L_h: \\gamma(t) = x + te_i$ ($t$ entre $0$ y $h$):\n$$\\varphi(x + he_i) - \\varphi(x) = \\int_{L_h} \\vec{F}\\cdot d\\vec{r} = \\int_0^h F_i(x + te_i)\\,dt.$$\n4. Dividiendo entre $h \\neq 0$ y tomando $h \\to 0$ (por continuidad de $F_i$ y el TFC):\n$$\\frac{\\partial\\varphi}{\\partial x_i}(x) = \\lim_{h\\to 0}\\frac{1}{h}\\int_0^h F_i(x + te_i)\\,dt = F_i(x).$$\n5. Como cada $F_i$ es continua, $\\varphi \\in C^1(U)$ y $\\nabla\\varphi = \\vec{F}$. $\\blacksquare$',
    commonMistakes: 'Olvidar justificar por qué el segmento $x + te_i$ permanece dentro de $U$ para $|t|$ suficientemente pequeño (¡por eso $U$ debe ser ABIERTO!).'
  },
  {
    id: 't4-18', topic: 't4', level: 5,
    title: 'Caracterización Completa de Campos Irrotacionales en $\\mathbb{R}^2 \\setminus \\{(0,0)\\}$',
    statement: 'Sea $\\vec{F} \\in C^1(\\mathbb{R}^2 \\setminus \\{(0,0)\\}, \\mathbb{R}^2)$ tal que $Q_x = P_y$ en todo $\\mathbb{R}^2 \\setminus \\{(0,0)\\}$, y sea $c = \\frac{1}{2\\pi}\\oint_{S^1} \\vec{F}\\cdot d\\vec{r}$. Demuestre que $\\vec{G} = \\vec{F} - c\\vec{V}$ (donde $\\vec{V}$ es el vórtice unitario) es CONSERVATIVO en $\\mathbb{R}^2 \\setminus \\{(0,0)\\}$, es decir $\\vec{F} = \\nabla\\varphi + c\\vec{V}$.',
    hint: 'Comprueba que $\\oint_C \\vec{G}\\cdot d\\vec{r} = 0$ para toda curva cerrada $C$ en $\\mathbb{R}^2 \\setminus \\{(0,0)\\}$ usando el índice de enrollamiento $k \\in \\mathbb{Z}$.',
    solution: '1. Para el campo $\\vec{G} = \\vec{F} - c\\vec{V}$, se cumple $\\operatorname{rot}_{2D}\\vec{G} = 0 - c(0) = 0$ en $\\mathbb{R}^2 \\setminus \\{(0,0)\\}$, y sobre la circunferencia unitaria $S^1$:\n$$\\oint_{S^1} \\vec{G}\\cdot d\\vec{r} = \\oint_{S^1} \\vec{F}\\cdot d\\vec{r} - c\\oint_{S^1} \\vec{V}\\cdot d\\vec{r} = 2\\pi c - c(2\\pi) = 0.$$\n2. Toda curva cerrada regular a trozos $C$ en $\\mathbb{R}^2 \\setminus \\{(0,0)\\}$ es homóloga a $k\\,S^1$ (con $k = \\operatorname{Ind}(C, 0) \\in \\mathbb{Z}$), por lo que por deformación de contornos:\n$$\\oint_C \\vec{G}\\cdot d\\vec{r} = k\\oint_{S^1} \\vec{G}\\cdot d\\vec{r} = k\\cdot 0 = 0.$$\n3. Como la circulación de $\\vec{G}$ es cero en TODA curva cerrada del abierto conexo $\\mathbb{R}^2 \\setminus \\{(0,0)\\}$, existe $\\varphi \\in C^1(\\mathbb{R}^2 \\setminus \\{(0,0)\\})$ tal que $\\vec{G} = \\nabla\\varphi$, luego $\\vec{F} = \\nabla\\varphi + c\\vec{V}$. $\\blacksquare$',
    commonMistakes: 'No darse cuenta de que este resultado explica por qué el espacio de cohomología de De Rham $H^1_{\\text{dR}}(\\mathbb{R}^2 \\setminus \\{(0,0)\\})$ tiene dimensión exactamente $1$ (generado por $\\vec{V}$!).'
  },

  // ============================================================================
  // SUBTEMA 5: TEOREMA DE GREEN SIMPLE Y MÚLTIPLEMENTE CONEXO (18 EJERCICIOS)
  // ============================================================================
  {
    id: 't5-01', topic: 't5', level: 0,
    title: 'Aplicación Directa de Green en un Cuadrado',
    statement: 'Use el Teorema de Green para evaluar $\\oint_C (y^2\\,dx + 3xy\\,dy)$ donde $C$ es el cuadrado $[0,2]\\times[0,2]$ orientado positivamente.',
    hint: 'Calcula $Q_x - P_y = 3y - 2y = y$ e integra sobre $[0,2]\\times[0,2]$.',
    solution: '1. $P = y^2 \\implies P_y = 2y$; $Q = 3xy \\implies Q_x = 3y$. Ambas son $C^\\infty(\\mathbb{R}^2)$.\n2. Por el Teorema de Green:\n$$\\oint_C (y^2\\,dx + 3xy\\,dy) = \\iint_{[0,2]^2} (3y - 2y)\\,dA = \\int_0^2 dx \\int_0^2 y\\,dy = 2\\cdot\\left[\\frac{y^2}{2}\\right]_0^2 = 4.$$',
    commonMistakes: 'Integrar $P_y - Q_x = -y$ en lugar de $Q_x - P_y = +y$, obteniendo $-4$.'
  },
  {
    id: 't5-02', topic: 't5', level: 0,
    title: 'Área de una Elipse mediante la Fórmula de Green',
    statement: 'Use $A = \\frac{1}{2}\\oint_{\\partial D^+} (x\\,dy - y\\,dx)$ para hallar el área encerrada por la elipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ ($a, b \\gt 0$).',
    hint: 'Parametriza $x = a\\cos t$, $y = b\\sin t$ ($t \\in [0, 2\\pi]$).',
    solution: '1. $x = a\\cos t \\implies dx = -a\\sin t\\,dt$; $y = b\\sin t \\implies dy = b\\cos t\\,dt$.\n2. $x\\,dy - y\\,dx = ab\\cos^2 t\\,dt + ab\\sin^2 t\\,dt = ab\\,dt$.\n3. Área:\n$$A = \\frac{1}{2}\\int_0^{2\\pi} ab\\,dt = \\pi a b.$$',
    commonMistakes: 'Olvidar el factor $\\frac{1}{2}$ delante de la integral, obteniendo $2\\pi ab$.'
  },
  {
    id: 't5-03', topic: 't5', level: 0,
    title: 'Teorema de Green con Orientación Horaria (Negativa)',
    statement: 'Calcule $\\oint_C (2y\\,dx + 5x\\,dy)$ donde $C$ es la circunferencia $x^2 + y^2 = 9$ recorrida en sentido HORARIO.',
    hint: 'Por orientación horaria, antepón un signo menos: $-\\iint_D (Q_x - P_y)\\,dA$.',
    solution: '1. $Q_x - P_y = 5 - 2 = 3$.\n2. Como $C$ está orientada negativamente (sentido horario):\n$$\\oint_C (2y\\,dx + 5x\\,dy) = -\\iint_{x^2+y^2\\le 9} 3\\,dA = -3(\\pi \\cdot 3^2) = -27\\pi.$$',
    commonMistakes: 'Ignorar la palabra «horario» en el enunciado y responder $+27\\pi$.'
  },
  {
    id: 't5-04', topic: 't5', level: 1,
    title: 'Simplificación de Términos No Elementales con Green',
    statement: 'Evalúe $\\oint_C \\left((e^{x^2} - y^3)\\,dx + (x^3 + \\sqrt{1 + y^4})\\,dy\\right)$ donde $C: x^2 + y^2 = 4$ tiene orientación positiva.',
    hint: 'Observa que $e^{x^2}$ solo depende de $x$ y $\\sqrt{1+y^4}$ solo depende de $y$: sus derivadas cruzadas son $0$!',
    solution: '1. $P_y = -3y^2$ y $Q_x = 3x^2$, luego $Q_x - P_y = 3(x^2 + y^2)$.\n2. Por Green y coordenadas polares ($0 \\le r \\le 2$, $0 \\le \\theta \\le 2\\pi$):\n$$I = \\iint_{x^2+y^2\\le 4} 3(x^2+y^2)\\,dA = \\int_0^{2\\pi} d\\theta \\int_0^2 3r^2 \\cdot r\\,dr = 2\\pi\\left[\\frac{3r^4}{4}\\right]_0^2 = 2\\pi(12) = 24\\pi.$$',
    commonMistakes: 'Olvidar el jacobiano polar $r$ en $dA = r\\,dr\\,d\\theta$.'
  },
  {
    id: 't5-05', topic: 't5', level: 1,
    title: 'Green sobre un Triángulo',
    statement: 'Calcule $\\oint_C (xy\\,dx + x^2 y^3\\,dy)$ sobre la frontera positiva del triángulo de vértices $(0,0)$, $(1,0)$ y $(1,2)$.',
    hint: 'El triángulo es Tipo 1: $0 \\le x \\le 1$, $0 \\le y \\le 2x$.',
    solution: '1. $Q_x - P_y = 2xy^3 - x$.\n2. Aplicando Green sobre $D = \\{0 \\le x \\le 1,\\; 0 \\le y \\le 2x\\}$:\n$$I = \\int_0^1 \\int_0^{2x} (2xy^3 - x)\\,dy\\,dx = \\int_0^1 \\left[\\frac{1}{2}xy^4 - xy\\right]_0^{2x} dx = \\int_0^1 (8x^5 - 2x^2)\\,dx = \\frac{8}{6} - \\frac{2}{3} = \\frac{2}{3}.$$',
    commonMistakes: 'Equivocar la recta superior del triángulo escribiendo $y = x/2$ en lugar de $y = 2x$.'
  },
  {
    id: 't5-06', topic: 't5', level: 1,
    title: 'Trabajo sobre el Cardioide con Términos Trascendentes (PC6 2024-II #4b)',
    statement: 'Calcule el trabajo de $\\vec{F}(x,y) = (e^{\\sin x} - y^2,\\; \\arctan y)$ a lo largo del cardioide $C: r = 1 + \\cos\\theta$, $\\theta \\in [0, 2\\pi]$.',
    hint: 'Por Green, $Q_x - P_y = 0 - (-2y) = 2y$, y el cardioide es simétrico respecto al eje $X$!',
    solution: '1. El campo es $C^\\infty(\\mathbb{R}^2)$ con $P_y = -2y$ y $Q_x = 0$, luego $Q_x - P_y = 2y$.\n2. Por el Teorema de Green sobre la región $D$ encerrada por el cardioide:\n$$W = \\iint_D 2y\\,dA.$$\n3. Como $D$ es simétrica respecto al eje $X$ ($r(-\\theta) = r(\\theta)$) y el integrando $2y$ es impar respecto a $y$:\n$$W = \\int_0^{2\\pi} \\int_0^{1+\\cos\\theta} 2(r\\sin\\theta)\\,r\\,dr\\,d\\theta = \\frac{2}{3}\\int_0^{2\\pi} (1+\\cos\\theta)^3\\sin\\theta\\,d\\theta = \\left[-\\frac{(1+\\cos\\theta)^4}{6}\\right]_0^{2\\pi} = 0.$$',
    commonMistakes: 'Perder tiempo intentando integrar $e^{\\sin(r\\cos\\theta)}$ en vez de usar Green + simetría.'
  },
  {
    id: 't5-07', topic: 't5', level: 2,
    title: 'Área Encerrada por un Astroide mediante Green',
    statement: 'Calcule el área encerrada por el astroide $x = a\\cos^3 t$, $y = a\\sin^3 t$, $t \\in [0, 2\\pi]$ ($a \\gt 0$) usando el Teorema de Green.',
    hint: 'Calcula $x\\,dy - y\\,dx = 3a^2\\sin^2 t\\cos^2 t\\,dt = \\frac{3a^2}{4}\\sin^2(2t)\\,dt$.',
    solution: '1. $dx = -3a\\cos^2 t\\sin t\\,dt$, $dy = 3a\\sin^2 t\\cos t\\,dt$.\n2. $x\\,dy - y\\,dx = 3a^2\\cos^4 t\\sin^2 t\\,dt + 3a^2\\sin^4 t\\cos^2 t\\,dt = 3a^2\\sin^2 t\\cos^2 t(\\cos^2 t + \\sin^2 t)\\,dt = \\frac{3a^2}{4}\\sin^2(2t)\\,dt$.\n3. Usando $\\sin^2(2t) = \\frac{1 - \\cos(4t)}{2}$:\n$$A = \\frac{1}{2}\\int_0^{2\\pi} \\frac{3a^2}{4}\\cdot\\frac{1-\\cos(4t)}{2}\\,dt = \\frac{3a^2}{16}(2\\pi) = \\frac{3\\pi a^2}{8}.$$',
    commonMistakes: 'Usar $\\oint x\\,dy$ sin simplificar con la forma simétrica $\\frac{1}{2}\\oint(x\\,dy-y\\,dx)$, duplicando el esfuerzo trigonométrico.'
  },
  {
    id: 't5-08', topic: 't5', level: 2,
    title: 'Cierre de Curva Abierta con Segmento Auxiliar',
    statement: 'Calcule $\\int_C \\left((2xy - x^2)\\,dx + (x + y^2)\\,dy\\right)$ donde $C$ es el arco de $y = x^2$ desde $(0,0)$ hasta $(1,1)$, usando el Teorema de Green.',
    hint: 'Cierra la curva con el segmento recto $L$ de regreso de $(1,1)$ a $(0,0)$ para formar $C \\cup L = \\partial D^+$.',
    solution: '1. Sea $L$ el segmento desde $(1,1)$ hasta $(0,0)$: $C \\cup L$ encierra positivamente $D = \\{0\\le x\\le 1,\\; x^2 \\le y \\le x\\}$.\n2. $Q_x - P_y = 1 - 2x$. Por Green:\n$$\\int_C + \\int_L = \\int_0^1 \\int_{x^2}^x (1 - 2x)\\,dy\\,dx = \\int_0^1 (1-2x)(x - x^2)\\,dx = \\int_0^1 (x - 3x^2 + 2x^3)\\,dx = \\frac{1}{2} - 1 + \\frac{1}{2} = 0.$$\n3. Calculamos $\\int_L$ sobre $(t, t)$ con $t$ de $1$ a $0$:\n$$\\int_L = \\int_1^0 \\big[(2t^2-t^2) + (t+t^2)\\big]\\,dt = -\\int_0^1 (2t^2 + t)\\,dt = -\\left(\\frac{2}{3} + \\frac{1}{2}\\right) = -\\frac{7}{6}.$$\n4. Despejando: $\\int_C = 0 - \\left(-\\frac{7}{6}\\right) = \\frac{7}{6}$.',
    commonMistakes: 'Olvidar restar $\\int_L$ o recorrer $L$ de $(0,0)$ a $(1,1)$ en lugar de $(1,1)$ a $(0,0)$.'
  },
  {
    id: 't5-09', topic: 't5', level: 2,
    title: 'Green en Región Doblemente Conexa (Anillo sin Singularidades)',
    statement: 'Sea $D = \\{(x,y) : 1 \\le x^2 + y^2 \\le 4\\}$ y $\\vec{F}(x,y) = (-y + x^2,\\; 2x + y^2)$. Verifique el Teorema de Green calculando tanto $\\iint_D (Q_x-P_y)\\,dA$ como $\\oint_{C_2^+} \\vec{F}\\cdot d\\vec{r} + \\oint_{C_1^-} \\vec{F}\\cdot d\\vec{r}$.',
    hint: '$Q_x - P_y = 2 - (-1) = 3$ constante; recuerda que el borde interior $C_1^-$ va en sentido HORARIO.',
    solution: '1. **Integral doble:** $Q_x - P_y = 3$, $\\operatorname{Area}(D) = \\pi(2^2 - 1^2) = 3\\pi$, luego $\\iint_D 3\\,dA = 9\\pi$.\n2. **Borde exterior $C_2^+$ ($R=2$, antihorario):** Los términos $(x^2, y^2)$ son conservativos (aportan $0$). Queda $\\oint_{C_2^+} (-y\\,dx + 2x\\,dy) = \\int_0^{2\\pi} (4\\sin^2 t + 8\\cos^2 t)\\,dt = 4\\pi + 8\\pi = 12\\pi$.\n3. **Borde interior $C_1^-$ ($r=1$, horario):** Mismo cálculo con signo opuesto y $r=1$: $-(1\\pi + 2\\pi) = -3\\pi$.\n4. **Suma de bordes:** $12\\pi + (-3\\pi) = 9\\pi = \\iint_D (Q_x - P_y)\\,dA$. ¡Verificado!',
    commonMistakes: 'Sumar $+3\\pi$ en el borde interior obteniendo $15\\pi \\neq 9\\pi$ por orientar el agujero en sentido antihorario.'
  },
  {
    id: 't5-10', topic: 't5', level: 3,
    title: 'Trampa UNI V/F: $F \\in C^1(U)$ con $U \\supset C$ solamente (PC6 2024-II #1c)',
    statement: 'Analice la veracidad de: «Sea $C$ una curva simple cerrada suave a trozos orientada positivamente, y $\\vec{F}=(P,Q)$ de clase $C^1$ en un abierto $U$ que contiene a $C$. Entonces $\\oint_C P\\,dx + Q\\,dy = \\iint_D (Q_x - P_y)\\,dA$».',
    hint: 'Lee con lupa: dice «$U$ contiene a $C$», NO dice «$U$ contiene a $D \\cup C$»!',
    solution: '1. **FALSO.** El Teorema de Green exige que $\\vec{F} \\in C^1(U)$ en un abierto $U$ que contenga a TODA la región cerrada $\\overline{D} = D \\cup C$, no solo a la frontera $C$.\n2. **Contraejemplo:** $C: x^2+y^2=1$, $U = \\{(x,y) : \\frac{1}{2} \\lt x^2+y^2 \\lt 2\\}$ (anillo abierto que contiene a $C$) y $\\vec{F} = \\left(\\frac{-y}{x^2+y^2}, \\frac{x}{x^2+y^2}\\right) \\in C^\\infty(U)$.\n3. Se obtiene $\\oint_C \\vec{F}\\cdot d\\vec{r} = 2\\pi$, mientras que $Q_x - P_y = 0$ en $D \\setminus \\{(0,0)\\}$ (la integral doble daría $0 \\neq 2\\pi$). $\\blacksquare$',
    commonMistakes: 'Leer deprisa y marcar VERDADERO pasando por alto la omisión de $D \\subset U$ (una de las trampas más letales de la PC6 UNI!).'
  },
  {
    id: 't5-11', topic: 't5', level: 3,
    title: 'Fórmulas de Centroide mediante el Teorema de Green (PC6 2026-I #3)',
    statement: 'Sea $R \\subset \\mathbb{R}^2$ una región acotada simplemente conexa de área $A$ con frontera $\\partial R^+$ orientada positivamente. Demuestre usando Green que las coordenadas de su centroide son $\\bar{x} = \\frac{1}{2A}\\oint_{\\partial R^+} x^2\\,dy$ y $\\bar{y} = -\\frac{1}{2A}\\oint_{\\partial R^+} y^2\\,dx$.',
    hint: 'Elige $(P,Q) = (0, x^2/2)$ para $\\bar{x}$ y $(P,Q) = (-y^2/2, 0)$ para $\\bar{y}$.',
    solution: '1. Por definición de centroide: $\\bar{x} = \\frac{1}{A}\\iint_R x\\,dA$ y $\\bar{y} = \\frac{1}{A}\\iint_R y\\,dA$.\n2. Tomemos $P(x,y) = 0$ y $Q(x,y) = \\frac{x^2}{2}$ ($C^\\infty$ en $\\mathbb{R}^2$). Entonces $Q_x - P_y = x$. Por el Teorema de Green:\n$$\\iint_R x\\,dA = \\oint_{\\partial R^+} \\frac{x^2}{2}\\,dy \\implies \\bar{x} = \\frac{1}{2A}\\oint_{\\partial R^+} x^2\\,dy.$$\n3. Tomemos $P(x,y) = -\\frac{y^2}{2}$ y $Q(x,y) = 0$. Entonces $Q_x - P_y = 0 - (-y) = y$. Por Green:\n$$\\iint_R y\\,dA = \\oint_{\\partial R^+} \\left(-\\frac{y^2}{2}\\right)dx \\implies \\bar{y} = -\\frac{1}{2A}\\oint_{\\partial R^+} y^2\\,dx. \\quad \\blacksquare$$',
    commonMistakes: 'Equivocar el signo de $P = -y^2/2$ en la fórmula de $\\bar{y}$.'
  },
  {
    id: 't5-12', topic: 't5', level: 3,
    title: 'Green Múltiplemente Conexo con Singularidad y Rotacional No Nulo',
    statement: 'Sea $\\vec{F}(x,y) = \\left(2y + \\frac{-y}{x^2+y^2},\\; 5x + \\frac{x}{x^2+y^2}\\right)$. Calcule $\\oint_C \\vec{F}\\cdot d\\vec{r}$ sobre el cuadrado $C = [-2,2]^2$ orientado positivamente.',
    hint: 'Separa el campo suave $(2y, 5x)$ (aplica Green normal) del vórtice (deforma el cuadrado a un círculo $C_\\varepsilon$).',
    solution: '1. Escribimos $\\vec{F} = \\vec{F}_1 + \\vec{V}$, con $\\vec{F}_1 = (2y, 5x) \\in C^\\infty(\\mathbb{R}^2)$ y $\\vec{V}$ el vórtice unitario.\n2. Para $\\vec{F}_1$, por Green sobre $D = [-2,2]^2$ (área $16$):\n$$\\oint_C \\vec{F}_1\\cdot d\\vec{r} = \\iint_D (5 - 2)\\,dA = 3(16) = 48.$$\n3. Para $\\vec{V}$, como $(0,0) \\in \\operatorname{int}(D)$ y $Q_x - P_y = 0$ en $D \\setminus \\{(0,0)\\}$, rodeamos $(0,0)$ con $C_\\varepsilon^+$ y por Green múltiplemente conexo:\n$$\\oint_C \\vec{V}\\cdot d\\vec{r} = \\oint_{C_\\varepsilon^+} \\vec{V}\\cdot d\\vec{r} = 2\\pi.$$\n4. Resultado total: $I = 48 + 2\\pi$.',
    commonMistakes: 'Aplicar Green directamente al campo entero sin excluir $(0,0)$, perdiendo el término $+2\\pi$!'
  },
  {
    id: 't5-13', topic: 't5', level: 4,
    title: 'Área del Lazo del Folio de Descartes mediante Green',
    statement: 'Calcule el área del lazo cerrado del folio de Descartes $x^3 + y^3 = 3axy$ ($a \\gt 0$) utilizando el Teorema de Green.',
    hint: 'Parametriza con $y = tx \\implies x(t) = \\frac{3at}{1+t^3}$, $y(t) = \\frac{3at^2}{1+t^3}$ para $t \\in [0, \\infty)$ y usa $x\\,dy - y\\,dx = x^2\\,dt$!',
    solution: '1. Con $y = t x$, $dy = t\\,dx + x\\,dt \\implies x\\,dy - y\\,dx = x(t\\,dx + x\\,dt) - (tx)\\,dx = x^2\\,dt$ (identidad mágica!).\n2. Sustituyendo $y = tx$ en $x^3 + y^3 = 3axy$: $x(t) = \\frac{3at}{1+t^3}$, recorriendo el lazo en sentido antihorario cuando $t$ va de $0$ a $+\\infty$.\n3. Aplicamos la fórmula de área de Green:\n$$A = \\frac{1}{2}\\int_0^\\infty x(t)^2\\,dt = \\frac{9a^2}{2}\\int_0^\\infty \\frac{t^2}{(1+t^3)^2}\\,dt.$$\n4. Con $u = 1 + t^3$, $du = 3t^2\\,dt$:\n$$A = \\frac{3a^2}{2}\\int_1^\\infty u^{-2}\\,du = \\frac{3a^2}{2}\\left[-\\frac{1}{u}\\right]_1^\\infty = \\frac{3a^2}{2}.$$',
    commonMistakes: 'Diferenciar $x(t)$ e $y(t)$ por separado haciendo cocientes gigantes en lugar de usar la identidad $y=tx \\implies x\\,dy - y\\,dx = x^2\\,dt$!'
  },
  {
    id: 't5-14', topic: 't5', level: 4,
    title: 'Forma Divergencia de Green (Flujo 2D con Fuentes)',
    statement: 'Calcule el flujo saliente $\\oint_C \\vec{F}\\cdot\\vec{n}\\,ds$ de $\\vec{F}(x,y) = (x^3 + y^2,\\; y^3 - x^2)$ a través de la circunferencia $C: x^2 + y^2 = R^2$.',
    hint: 'Usa $\\oint_C \\vec{F}\\cdot\\vec{n}\\,ds = \\iint_D (P_x + Q_y)\\,dA$ y pasa a polares.',
    solution: '1. Calculamos la divergencia 2D: $\\operatorname{div}\\vec{F} = P_x + Q_y = 3x^2 + 3y^2 = 3r^2$.\n2. Por la forma de divergencia del Teorema de Green:\n$$\\text{Flujo} = \\iint_{x^2+y^2\\le R^2} 3(x^2+y^2)\\,dA = \\int_0^{2\\pi} d\\theta \\int_0^R 3r^2\\cdot r\\,dr = 2\\pi\\left[\\frac{3r^4}{4}\\right]_0^R = \\frac{3\\pi R^4}{2}.$$',
    commonMistakes: 'Calcular el rotacional $Q_x - P_y = -2x - 2y$ (que da $0$) en lugar de la divergencia $P_x + Q_y$!'
  },
  {
    id: 't5-15', topic: 't5', level: 4,
    title: 'Región con Dos Agujeros y Tres Contornos Orientados',
    statement: 'Sea $D$ el disco $x^2+y^2 \\le 16$ al que se le extraen dos discos abiertos disjuntos $B_1 = B((2,0), 1)$ y $B_2 = B((-2,0), 1)$. Si $\\vec{F} \\in C^1(\\overline{D})$ cumple $Q_x - P_y = 0$ en $D$, $\\oint_{\\partial B_1^+} \\vec{F}\\cdot d\\vec{r} = 5$ y $\\oint_{\\partial B_2^+} \\vec{F}\\cdot d\\vec{r} = -3$ (ambos antihorarios), halle $\\oint_{C_{\\text{ext}}^+} \\vec{F}\\cdot d\\vec{r}$.',
    hint: 'Por Green múltiplemente conexo, $\\oint_{C_{\\text{ext}}^+} - \\oint_{\\partial B_1^+} - \\oint_{\\partial B_2^+} = \\iint_D 0\\,dA = 0$.',
    solution: '1. La frontera positivamente orientada de $D$ es $\\partial D^+ = C_{\\text{ext}}^+ \\cup \\partial B_1^- \\cup \\partial B_2^-$.\n2. Aplicando Green en regiones múltiplemente conexas:\n$$\\oint_{C_{\\text{ext}}^+} \\vec{F}\\cdot d\\vec{r} - \\oint_{\\partial B_1^+} \\vec{F}\\cdot d\\vec{r} - \\oint_{\\partial B_2^+} \\vec{F}\\cdot d\\vec{r} = \\iint_D (Q_x - P_y)\\,dA = 0.$$\n3. Despejando:\n$$\\oint_{C_{\\text{ext}}^+} \\vec{F}\\cdot d\\vec{r} = \\oint_{\\partial B_1^+} + \\oint_{\\partial B_2^+} = 5 + (-3) = 2.$$',
    commonMistakes: 'Equivocar los signos al pasar las integrales de los agujeros (orientados antihorariamente en el dato) al otro lado.'
  },
  {
    id: 't5-16', topic: 't5', level: 5,
    title: 'Primera Identidad de Green y Unicidad del Problema de Dirichlet',
    statement: 'Sea $u \\in C^2(\\overline{D})$ armónica ($\\Delta u = u_{xx} + u_{yy} = 0$) en una región regular $D \\subset \\mathbb{R}^2$ tal que $u = 0$ en toda la frontera $\\partial D$. Demuestre usando el Teorema de Green que $u \\equiv 0$ en todo $D$.',
    hint: 'Aplica Green-Divergencia al campo $\\vec{F} = u\\,\\nabla u = (u u_x, u u_y)$ para obtener $\\iint_D \\|\\nabla u\\|^2\\,dA = \\oint_{\\partial D^+} u\\frac{\\partial u}{\\partial n}\\,ds$.',
    solution: '1. Definimos $\\vec{F} = (u u_x,\\; u u_y) \\in C^1(\\overline{D})$.\n2. Su divergencia es:\n$$\\operatorname{div}\\vec{F} = \\frac{\\partial}{\\partial x}(u u_x) + \\frac{\\partial}{\\partial y}(u u_y) = (u_x^2 + u_y^2) + u(u_{xx} + u_{yy}) = \\|\\nabla u\\|^2 + u\\,\\Delta u.$$\n3. Como $\\Delta u = 0$ en $D$, por la forma de divergencia del Teorema de Green:\n$$\\iint_D \\|\\nabla u\\|^2\\,dA = \\oint_{\\partial D^+} u\\,(\\nabla u \\cdot \\vec{n})\\,ds = \\oint_{\\partial D^+} 0\\,ds = 0$$\nporque $u = 0$ en $\\partial D$.\n4. Como $\\|\\nabla u\\|^2 \\ge 0$ es continua y su integral es $0$, necesariamente $\\nabla u \\equiv \\vec{0}$ en $D$, luego $u$ es constante en $D$. Como $u = 0$ en $\\partial D$, concluimos $u \\equiv 0$ en $\\overline{D}$. $\\blacksquare$',
    commonMistakes: 'Aplicar Green a $\\nabla u$ directamente (eso solo da $\\oint \\partial_n u = 0$, no $\\|\\nabla u\\|^2$); el truco clave es usar $u\\,\\nabla u$!'
  },
  {
    id: 't5-17', topic: 't5', level: 5,
    title: 'Deducción del Cambio de Variables en Integrales Dobles desde Green (Área)',
    statement: 'Sea $\\Phi(u,v) = (x(u,v), y(u,v))$ un $C^2$-difeomorfismo que preserva orientación ($\\det J_\\Phi \\gt 0$) mapeando una región $S$ sobre $D = \\Phi(S)$. Use el Teorema de Green en $D$ y luego en $S$ para probar que $\\operatorname{Area}(D) = \\iint_S \\det J_\\Phi(u,v)\\,du\\,dv$.',
    hint: 'Escribe $\\operatorname{Area}(D) = \\oint_{\\partial D^+} x\\,dy$, haz pullback a $\\partial S^+$ con $dy = y_u\\,du + y_v\\,dv$ y vuelve a aplicar Green en el plano $(u,v)$!',
    solution: '1. Por Green en el plano $(x,y)$: $\\operatorname{Area}(D) = \\oint_{\\partial D^+} x\\,dy$.\n2. Como $\\Phi$ preserva orientación, $\\Phi(\\partial S^+) = \\partial D^+$. Sustituyendo $dy = y_u\\,du + y_v\\,dv$:\n$$\\operatorname{Area}(D) = \\oint_{\\partial S^+} \\big( (x\\,y_u)\\,du + (x\\,y_v)\\,dv \\big).$$\n3. Aplicamos el Teorema de Green ahora en el plano $(u,v)$ sobre $S$:\n$$\\operatorname{Area}(D) = \\iint_S \\left[ \\frac{\\partial}{\\partial u}(x\\,y_v) - \\frac{\\partial}{\\partial v}(x\\,y_u) \\right] du\\,dv = \\iint_S \\big( x_u y_v + x y_{vu} - x_v y_u - x y_{uv} \\big)\\,du\\,dv.$$\n4. Como $\\Phi \\in C^2$, $y_{vu} = y_{uv}$ por Schwarz y los términos cruzados se cancelan:\n$$\\operatorname{Area}(D) = \\iint_S (x_u y_v - x_v y_u)\\,du\\,dv = \\iint_S \\det J_\\Phi(u,v)\\,du\\,dv. \\quad \\blacksquare$$',
    commonMistakes: 'Olvidar invocar $\\Phi \\in C^2$ (Teorema de Schwarz) para cancelar $x y_{vu} - x y_{uv}$.'
  },
  {
    id: 't5-18', topic: 't5', level: 5,
    title: 'Teorema del Punto Fijo de Brouwer (Lema de No Retracción en el Disco vía Green)',
    statement: 'Demuestre que NO existe ninguna aplicación $r: \\overline{D} \\to S^1$ de clase $C^2$ del disco cerrado $\\overline{D} = \\{x^2+y^2 \\le 1\\}$ sobre su frontera $S^1$ tal que $r(p) = p$ para todo $p \\in S^1$ (retracción suave).',
    hint: 'Si existiera $r = (u, v)$ con $u^2 + v^2 = 1$ en todo $\\overline{D}$, calcula $\\oint_{S^1} (u\\,dv - v\\,du)$ de dos maneras: en el borde vale $2\\pi$, pero por Green en $D$ depende de $\\det Jr = 0$!',
    solution: '1. Supongamos por contradicción que existe $r(x,y) = (u(x,y), v(x,y)) \\in C^2(\\overline{D})$ tal que $u^2 + v^2 = 1$ en todo $\\overline{D}$ y $r(x,y) = (x,y)$ sobre $S^1 = \\partial D^+$.\n2. Derivando $u^2 + v^2 = 1$ respecto a $x$ e $y$:\n$$u\\,u_x + v\\,v_x = 0, \\qquad u\\,u_y + v\\,v_y = 0.$$\nComo $(u,v) \\neq (0,0)$ en todo $\\overline{D}$, este sistema homogéneo tiene solución no trivial, luego su determinante es cero: $u_x v_y - u_y v_x = 0$ en todo $\\overline{D}$.\n3. Consideremos la integral de línea $I = \\oint_{\\partial D^+} (u\\,dv - v\\,du)$. Como sobre $S^1$ tenemos $u=x, v=y$:\n$$I = \\oint_{S^1} (x\\,dy - y\\,dx) = 2\\operatorname{Area}(D) = 2\\pi.$$\n4. Por otro lado, escribiendo $u\\,dv - v\\,du = (u v_x - v u_x)\\,dx + (u v_y - v u_y)\\,dy$ y aplicando el Teorema de Green en $D$ ($r \\in C^2$, cancelación por Schwarz):\n$$I = \\iint_D 2(u_x v_y - u_y v_x)\\,dA = \\iint_D 0\\,dA = 0.$$\n5. Obtenemos $2\\pi = 0$, ¡contradicción! Por tanto no existe ninguna retracción $C^2$. $\\blacksquare$',
    commonMistakes: 'No notar que $u^2+v^2=1$ implica linealidad dependiente de las filas de $Jr$ ($\\det Jr \\equiv 0$).'
  }
];
