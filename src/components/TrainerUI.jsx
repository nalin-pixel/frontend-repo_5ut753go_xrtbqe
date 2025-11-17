import { useState } from 'react'

const colors = {
  bg: 'bg-black',
  card: 'bg-[#0b0b0f]/80',
  purple: '#874bff',
  turquoise: '#2ce3c2',
  blue: '#4ea4ff'
}

function Section({ title, subtitle, children }) {
  return (
    <section className="rounded-xl border border-purple-500/20 p-5 md:p-6 bg-gradient-to-b from-white/5 to-transparent">
      <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-1">
        <span className="text-white">{title}</span>
      </h2>
      {subtitle && <p className="text-sm text-gray-400 mb-3">{subtitle}</p>}
      <div className="text-gray-200 leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  )
}

export default function TrainerUI() {
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)

  function toBool(v) {
    if (v === 'sim') return true
    if (v === 'nao') return false
    return null
  }

  async function handleGenerate(e) {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget)

    const parseList = (name) => (form.get(name) || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    const questionnaire = {
      // Obrigatórios
      objetivo: form.get('objetivo'),
      nivel: form.get('nivel'),
      sessoes_semana: Number(form.get('sessoes_semana')),
      tempo_por_sessao_min: Number(form.get('tempo_por_sessao_min')),

      // 1. Identidade física e rotina
      idade: form.get('idade') ? Number(form.get('idade')) : null,
      altura_cm: form.get('altura_cm') ? Number(form.get('altura_cm')) : null,
      peso_kg: form.get('peso_kg') ? Number(form.get('peso_kg')) : null,
      peso_max_adulto: form.get('peso_max_adulto') ? Number(form.get('peso_max_adulto')) : null,
      peso_min_adulto: form.get('peso_min_adulto') ? Number(form.get('peso_min_adulto')) : null,
      corpo_descr: form.get('corpo_descr') || null,
      energia_nivel: form.get('energia_nivel') || null,
      rotina_prof: form.get('rotina_prof') || null,
      horas_tela_dia: form.get('horas_tela_dia') ? Number(form.get('horas_tela_dia')) : null,
      estresse_nivel: form.get('estresse_nivel') || null,

      // 2. Objetivo claro
      objetivo_quilos: form.get('objetivo_quilos') ? Number(form.get('objetivo_quilos')) : null,
      objetivo_tempo: form.get('objetivo_tempo') || null,
      motivo_emocional: form.get('motivo_emocional') || null,
      sentimento_desejado: form.get('sentimento_desejado') || null,
      comprometimento_nota: form.get('comprometimento_nota') ? Number(form.get('comprometimento_nota')) : null,
      comprometimento_motivo: form.get('comprometimento_motivo') || null,

      // 3. Histórico
      treinou_com_personal: toBool(form.get('treinou_com_personal')),
      metodos_feitos: parseList('metodos_feitos'),
      funcionou: form.get('funcionou') || null,
      nao_funcionou: form.get('nao_funcionou') || null,
      treino_consistente_descricao: form.get('treino_consistente_descricao') || null,
      treino_consistente_tempo: form.get('treino_consistente_tempo') || null,
      dificuldade_aprender_movimentos: toBool(form.get('dificuldade_aprender_movimentos')),

      // 4. Saúde geral
      lesoes: parseList('lesoes'),
      dores: parseList('dores'),
      estado_articulacoes: form.get('estado_articulacoes') || null,
      cirurgias: form.get('cirurgias') || null,
      limitacao_medica: form.get('limitacao_medica') || null,
      dor_partes: form.get('dor_partes') || null,
      sono_rotina_qualidade: form.get('sono_rotina_qualidade') || null,
      nutricionista_acompanhamento: toBool(form.get('nutricionista_acompanhamento')),
      historico_condicoes: form.get('historico_condicoes') || null,

      // 5. Alimentação
      dia_alimentar: form.get('dia_alimentar') || null,
      cozinha: toBool(form.get('cozinha')),
      dificuldade_proteina: toBool(form.get('dificuldade_proteina')),
      cafe_da_manha: form.get('cafe_da_manha') || null,
      alcool_frequencia: form.get('alcool_frequencia') || null,
      hidratacao: form.get('hidratacao') || null,
      aversoes_restricoes: form.get('aversoes_restricoes') || null,

      // 6. Equipamentos
      local_treino: form.get('local_treino') || null,
      equipamentos: parseList('equipamentos'),
      disposto_comprar_equip: toBool(form.get('disposto_comprar_equip')),

      // 7. Tempo
      preferencia_horario: form.get('preferencia_horario') || null,

      // 8. Estilo
      estilo_preferido: form.get('estilo_preferido') || null,
      treinos_longos_desanima: toBool(form.get('treinos_longos_desanima')),
      estrutura_fixa_ou_variedade: form.get('estrutura_fixa_ou_variedade') || null,
      foco_preferido: form.get('foco_preferido') || null,

      // 9. Sensação corporal
      dificuldade_sentir_gluteos: toBool(form.get('dificuldade_sentir_gluteos')),
      ativar_abdomen_facilidade: form.get('ativar_abdomen_facilidade') || null,
      onde_acumula_gordura: form.get('onde_acumula_gordura') || null,
      musculos_dificeis_responder: form.get('musculos_dificeis_responder') || null,
      desconfortos_movimentos: parseList('desconfortos_movimentos'),

      // 10. Psicológico
      desistir_motivos: form.get('desistir_motivos') || null,
      coach_estilo: form.get('coach_estilo') || null,
      empolga: form.get('empolga') || null,
      vergonha_motivo: form.get('vergonha_motivo') || null,
      paciencia_aprender_nota: form.get('paciencia_aprender_nota') ? Number(form.get('paciencia_aprender_nota')) : null,

      // 11. Vida social
      fim_de_semana: form.get('fim_de_semana') || null,
      sono_fds_pior: toBool(form.get('sono_fds_pior')),
      viagens_programadas: form.get('viagens_programadas') || null,
      apoio_rotina: form.get('apoio_rotina') || null,

      // 12. Emagrecimento específico
      facilidade_perder_peso: form.get('facilidade_perder_peso') || null,
      facilidade_ganhar_musculo: form.get('facilidade_ganhar_musculo') || null,
      protocolos_extremos: form.get('protocolos_extremos') || null,
      gatilho_comer_alem: form.get('gatilho_comer_alem') || null,

      // 13. Massa muscular
      grupamentos_prioridade: form.get('grupamentos_prioridade') || null,
      nao_gosta_treinar: form.get('nao_gosta_treinar') || null,
      objetivos_esteticos: form.get('objetivos_esteticos') || null,
      suplementos_usados: form.get('suplementos_usados') || null,

      // 14. Zona de risco
      evento_motivador: form.get('evento_motivador') || null,
      barreiras_reais: form.get('barreiras_reais') || null,
      mudaria_estilo_vida: form.get('mudaria_estilo_vida') || null,

      // 15. O mais importante
      obra_prima_precisa_ver: form.get('obra_prima_precisa_ver') || null,
      como_quer_se_ver_3m: form.get('como_quer_se_ver_3m') || null,
      motivo_secreto: form.get('motivo_secreto') || null,

      // Extras mantidos
      sexo: form.get('sexo') || null,
      rotina: form.get('rotina') || null,
      cardio_preferido: form.get('cardio_preferido') || 'caminhada',
      historico: form.get('historico') || null,
      personalidade: form.get('personalidade') || null,
      restricoes: form.get('restricoes') || null
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionnaire })
      })
      const data = await res.json()
      setPlan(data)
    } catch (err) {
      console.error(err)
      alert('Erro ao gerar plano. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${colors.bg} min-h-screen text-white`}>
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight"><span className="text-white">Personal Trainer Premium</span><span className="ml-2 text-[#874bff]">.blue</span></h1>
          <p className="text-gray-300 mt-2">Direto, claro e sob medida. Você responde, eu entrego um plano de treino de alto nível — pronto para executar.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Formulário */}
          <form onSubmit={handleGenerate} className="space-y-4 md:space-y-5">
            {/* Campos obrigatórios e topo */}
            <Section title="Parâmetros essenciais" subtitle="Definem a espinha dorsal do plano.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-300">Objetivo</label>
                  <select name="objetivo" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2ce3c2]" required>
                    <option value="emagrecimento">Emagrecimento</option>
                    <option value="ganho de massa">Ganho de massa</option>
                    <option value="recomposicao">Recomposição</option>
                    <option value="condicionamento">Condicionamento</option>
                    <option value="saude">Saúde</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Nível</label>
                  <select name="nivel" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2 focus:outline-none" required>
                    <option value="iniciante">Iniciante</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="avancado">Avançado</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Sessões por semana</label>
                  <input type="number" name="sessoes_semana" min="2" max="7" defaultValue={4} className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Tempo por sessão (min)</label>
                  <input type="number" name="tempo_por_sessao_min" min="15" max="120" defaultValue={45} className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" required />
                </div>
              </div>
            </Section>

            {/* 1. Identidade física e rotina */}
            <Section title="1. Identidade física e rotina de vida">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-gray-300">Idade</label>
                  <input type="number" name="idade" min="10" max="100" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Altura (cm)</label>
                  <input type="number" name="altura_cm" min="120" max="230" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Peso atual (kg)</label>
                  <input type="number" step="0.1" name="peso_kg" min="30" max="300" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Peso máximo (adulto)</label>
                  <input type="number" step="0.1" name="peso_max_adulto" min="30" max="400" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Peso mínimo (adulto)</label>
                  <input type="number" step="0.1" name="peso_min_adulto" min="30" max="400" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-sm text-gray-300">Descrição do corpo hoje</label>
                  <input name="corpo_descr" placeholder="gordura, força, postura, autonomia, resistência" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Nível de energia</label>
                  <input name="energia_nivel" placeholder="baixo, médio, alto" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Rotina profissional</label>
                  <select name="rotina_prof" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="sentado">Sentado(a)</option>
                    <option value="em_pe">Em pé</option>
                    <option value="alternancia">Alternância</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Horas de tela/dia</label>
                  <input type="number" name="horas_tela_dia" min="0" max="18" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-sm text-gray-300">Nível de estresse</label>
                  <input name="estresse_nivel" placeholder="baixo, médio, alto" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
              </div>
            </Section>

            {/* 2. Objetivo claro */}
            <Section title="2. Objetivo claro (sem papo gourmet)">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-gray-300">Kg a ganhar/perder</label>
                  <input type="number" step="0.1" name="objetivo_quilos" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Em quanto tempo?</label>
                  <input name="objetivo_tempo" placeholder="ex: 12 semanas" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-sm text-gray-300">Motivo emocional</label>
                  <input name="motivo_emocional" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-sm text-gray-300">Como quer se sentir no final?</label>
                  <input name="sentimento_desejado" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Comprometimento (0–10)</label>
                  <input type="number" min="0" max="10" name="comprometimento_nota" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Por quê?</label>
                  <input name="comprometimento_motivo" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
              </div>
            </Section>

            {/* 3. Histórico de treinos */}
            <Section title="3. Histórico de treinos">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-300">Já treinou com personal?</label>
                  <select name="treinou_com_personal" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Métodos já feitos</label>
                  <input name="metodos_feitos" placeholder="musculação, corrida, HIIT..." className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">O que funcionou</label>
                  <input name="funcionou" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">O que não funcionou</label>
                  <input name="nao_funcionou" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Seu treino mais consistente (e por quanto tempo)</label>
                  <input name="treino_consistente_descricao" placeholder="ex: musculação 4x/sem por 6 meses" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Dificuldade para aprender movimentos?</label>
                  <select name="dificuldade_aprender_movimentos" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
              </div>
            </Section>

            {/* 4. Saúde geral */}
            <Section title="4. Saúde geral (sem diagnóstico)">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-300">Lesões</label>
                  <input name="lesoes" placeholder="joelho, ombro, lombar..." className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Dores atuais</label>
                  <input name="dores" placeholder="lombar, cervical..." className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Joelhos/tornozelos/mobilidade de quadril</label>
                  <input name="estado_articulacoes" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Cirurgias</label>
                  <input name="cirurgias" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Limitações médicas</label>
                  <input name="limitacao_medica" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Onde dói hoje</label>
                  <input name="dor_partes" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Sono (horários e qualidade)</label>
                  <input name="sono_rotina_qualidade" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Nutricionista?</label>
                  <select name="nutricionista_acompanhamento" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Condições (anemia, RI, tireoide...)</label>
                  <input name="historico_condicoes" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
              </div>
            </Section>

            {/* 5. Alimentação e hábitos */}
            <Section title="5. Alimentação e hábitos">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Dia alimentar comum</label>
                  <input name="dia_alimentar" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Costuma cozinhar?</label>
                  <select name="cozinha" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Dificuldade em proteína?</label>
                  <select name="dificuldade_proteina" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Café da manhã</label>
                  <select name="cafe_da_manha" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="toma">Toma</option>
                    <option value="pula">Pula</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Álcool (frequência)</label>
                  <input name="alcool_frequencia" placeholder="nunca, 1x/sem, social..." className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Hidratação</label>
                  <input name="hidratacao" placeholder="ex: 2L/dia" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Aversões/restrições</label>
                  <input name="aversoes_restricoes" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
              </div>
            </Section>

            {/* 6. Equipamentos */}
            <Section title="6. Equipamentos disponíveis">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-300">Local de treino</label>
                  <select name="local_treino" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="academia">Academia</option>
                    <option value="casa">Casa</option>
                    <option value="ambos">Ambos</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Equipamentos (vírgula)</label>
                  <input name="equipamentos" placeholder="halteres, elásticos, barra, banco, kettlebell..." className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Compraria equipamento?</label>
                  <select name="disposto_comprar_equip" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
              </div>
            </Section>

            {/* 7. Tempo real disponível */}
            <Section title="7. Tempo real disponível">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-3">
                  <label className="text-sm text-gray-300">Preferência de horário</label>
                  <select name="preferencia_horario" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="manha">Manhã</option>
                    <option value="tarde">Tarde</option>
                    <option value="noite">Noite</option>
                  </select>
                </div>
              </div>
            </Section>

            {/* 8. Estilo de treino preferido */}
            <Section title="8. Estilo de treino preferido">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-300">Estilo</label>
                  <select name="estilo_preferido" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Sem preferência</option>
                    <option value="tecnico_lento">Técnico e lento</option>
                    <option value="rapido_intenso">Rápido e intenso</option>
                    <option value="mistura">Mistura</option>
                    <option value="full body">Full body</option>
                    <option value="abc">ABC</option>
                    <option value="upper/lower">Upper/Lower</option>
                    <option value="circuito">Circuito</option>
                    <option value="funcional">Funcional</option>
                    <option value="maquinas">Máquinas</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Treinos longos te desanimam?</label>
                  <select name="treinos_longos_desanima" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Estrutura</label>
                  <select name="estrutura_fixa_ou_variedade" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Sem preferência</option>
                    <option value="fixa">Estrutura fixa</option>
                    <option value="variedade">Variedade semanal</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Foco preferido</label>
                  <select name="foco_preferido" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="forca">Força</option>
                    <option value="cardio">Cardio</option>
                    <option value="estetica">Estética</option>
                    <option value="performance">Performance</option>
                  </select>
                </div>
              </div>
            </Section>

            {/* 9. Sensação corporal */}
            <Section title="9. Sensação corporal">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-300">Dificuldade para sentir glúteos?</label>
                  <select name="dificuldade_sentir_gluteos" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Facilidade em ativar abdômen</label>
                  <input name="ativar_abdomen_facilidade" placeholder="fácil, médio, difícil" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Onde acumula mais gordura</label>
                  <input name="onde_acumula_gordura" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Músculos que não respondem tão bem</label>
                  <input name="musculos_dificeis_responder" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Desconforto em movimentos (vírgula)</label>
                  <input name="desconfortos_movimentos" placeholder="agachamento, avanço, stiff, flexão, prancha, corrida" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
              </div>
            </Section>

            {/* 10. Psicológico do treino */}
            <Section title="10. Psicológico do treino">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">O que faz você desistir</label>
                  <input name="desistir_motivos" placeholder="cansaço, preguiça, tempo..." className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Estilo de coach</label>
                  <select name="coach_estilo" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="motivador">Motivador</option>
                    <option value="tecnico">Técnico</option>
                    <option value="firme">Firme</option>
                    <option value="suave">Suave</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">O que te empolga</label>
                  <input name="empolga" placeholder="música, resultados rápidos, rotina simples" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Já sentiu vergonha? Por quê?</label>
                  <input name="vergonha_motivo" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Paciência p/ aprender (0–10)</label>
                  <input type="number" min="0" max="10" name="paciencia_aprender_nota" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
              </div>
            </Section>

            {/* 11. Vida social */}
            <Section title="11. Vida social e impacto no treino">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Fim de semana</label>
                  <input name="fim_de_semana" placeholder="saídas, comida, bebida" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Dorme pior no fds?</label>
                  <select name="sono_fds_pior" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Viagens programadas</label>
                  <input name="viagens_programadas" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Apoio (parceiro, família, amigos)</label>
                  <input name="apoio_rotina" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
              </div>
            </Section>

            {/* 12. Emagrecimento específico */}
            <Section title="12. Emagrecimento específico">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-gray-300">Perder peso</label>
                  <select name="facilidade_perder_peso" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="facil">Fácil</option>
                    <option value="medio">Médio</option>
                    <option value="dificil">Difícil</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Ganhar músculo</label>
                  <select name="facilidade_ganhar_musculo" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Selecione</option>
                    <option value="facil">Fácil</option>
                    <option value="medio">Médio</option>
                    <option value="dificil">Difícil</option>
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <label className="text-sm text-gray-300">Protocolos extremos já feitos</label>
                  <input name="protocolos_extremos" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-sm text-gray-300">Maior gatilho para comer além</label>
                  <input name="gatilho_comer_alem" placeholder="ansiedade, rotina, social, estresse" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
              </div>
            </Section>

            {/* 13. Massa muscular específica */}
            <Section title="13. Massa muscular específica">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Grupamentos que mais quer desenvolver</label>
                  <input name="grupamentos_prioridade" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Grupos que não gosta de treinar</label>
                  <input name="nao_gosta_treinar" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Objetivos estéticos específicos</label>
                  <input name="objetivos_esteticos" placeholder="ombros mais redondos, glúteo maior..." className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Suplementos usados</label>
                  <input name="suplementos_usados" placeholder="creatina, whey, cafeína..." className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
              </div>
            </Section>

            {/* 14. Zona de risco e motivação */}
            <Section title="14. Zona de risco e motivação">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-300">Evento motivador</label>
                  <input name="evento_motivador" placeholder="viagem, festa, projeto" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Maiores barreiras hoje</label>
                  <input name="barreiras_reais" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">O que toparia mudar</label>
                  <input name="mudaria_estilo_vida" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
              </div>
            </Section>

            {/* 15. O mais importante */}
            <Section title="15. O mais importante">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Para ser uma obra-prima, o que PRECISA ter?</label>
                  <input name="obra_prima_precisa_ver" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Como quer se ver em 3 meses?</label>
                  <input name="como_quer_se_ver_3m" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Motivo secreto</label>
                  <input name="motivo_secreto" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
              </div>
            </Section>

            {/* Extras opcionais (mantidos para enriquecimento) */}
            <Section title="Extras opcionais">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-300">Sexo</label>
                  <select name="sexo" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Prefiro não dizer</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Rotina / horários</label>
                  <input name="rotina" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Cardio preferido</label>
                  <select name="cardio_preferido" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="caminhada">Caminhada</option>
                    <option value="esteira">Esteira</option>
                    <option value="bike">Bike</option>
                    <option value="eliptico">Elíptico</option>
                    <option value="pular corda">Pular corda</option>
                    <option value="nenhum">Nenhum</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Histórico livre</label>
                  <input name="historico" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Personalidade de treino</label>
                  <input name="personalidade" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Restrições gerais</label>
                  <input name="restricoes" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
              </div>

              <div className="pt-4">
                <button disabled={loading} className="w-full md:w-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium border border-[#2ce3c2] text-black" style={{background: colors.turquoise}}>
                  {loading ? 'Gerando plano...' : 'Gerar treino premium'}
                </button>
              </div>
            </Section>
          </form>

          {/* Resultado */}
          <div className="space-y-4 md:space-y-5">
            <Section title="Plano Personalizado">
              {!plan && (
                <p className="text-gray-400">Preencha o questionário. Eu interpreto tudo e entrego um plano claro, direto e pronto para aplicar.</p>
              )}
              {plan && (
                <div className="space-y-6">
                  {/* 1. Resumo do aluno */}
                  <div className="rounded-lg border border-purple-500/30 p-4 bg-black/30">
                    <h3 className="text-[#874bff] font-semibold mb-2">1. Resumo do aluno</h3>
                    <ul className="text-sm md:text-base text-gray-200 leading-7 list-disc list-inside">
                      <li>Objetivo: {plan.resumo.objetivo}</li>
                      <li>Nível: {plan.resumo.nivel}</li>
                      {plan.resumo.lesoes_limitacoes?.length > 0 && (
                        <li>Limitações: {plan.resumo.lesoes_limitacoes.join(', ')}</li>
                      )}
                      <li>Rotina/tempo: {plan.resumo.rotina_tempo}</li>
                      <li>Estilo: {plan.resumo.estilo}</li>
                      <li>Equipamentos: {plan.resumo.equipamentos.join(', ')}</li>
                    </ul>
                  </div>

                  {/* 2. Estratégia de Treino */}
                  <div className="rounded-lg border border-purple-500/30 p-4 bg-black/30">
                    <h3 className="text-[#874bff] font-semibold mb-2">2. Estratégia de Treino</h3>
                    <p className="text-sm md:text-base text-gray-200">Foco: {plan.estrategia.foco}. Estilo: {plan.estrategia.estilo}. Intensidade: {plan.estrategia.intensidade_inicial}. Frequência: {plan.estrategia.frequencia}. Duração: {plan.estrategia.duracao}. {plan.estrategia.cuidados?.filter(Boolean).join(' ')} Justificativa: {plan.estrategia.justificativa}.</p>
                  </div>

                  {/* 3. Treino Personalizado – Semana 1 */}
                  <div className="rounded-lg border border-purple-500/30 p-4 bg-black/30">
                    <h3 className="text-[#874bff] font-semibold mb-2">3. Treino Personalizado – Semana 1</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-turquoise-300 font-medium" style={{color: colors.turquoise}}>Aquecimento (3–5 min)</p>
                        <ul className="list-disc list-inside text-gray-200">
                          {plan.semana1.aquecimento.map((a, i) => (
                            <li key={i}>{a.exercicio} — {a.tempo}. {a.descricao}{a.adaptacao ? ` — ${a.adaptacao}` : ''}</li>
                          ))}
                        </ul>
                      </div>
                      {plan.semana1.principais.map((ex, i) => (
                        <div key={i} className="rounded-md border border-purple-500/20 p-3">
                          <p className="text-white font-medium">Exercício Principal {i+1}: {ex.nome}</p>
                          <p className="text-gray-300">{ex.series_reps}</p>
                          <p className="text-gray-200">{ex.execucao}</p>
                          {ex.ajuste && <p className="text-blue-300" style={{color: colors.blue}}>Ajuste: {ex.ajuste}</p>}
                        </div>
                      ))}
                      {plan.semana1.finalizacao && (
                        <div>
                          <p className="text-turquoise-300 font-medium" style={{color: colors.turquoise}}>Finalização / Cardio</p>
                          <p className="text-gray-200">{plan.semana1.finalizacao.tipo} — {plan.semana1.finalizacao.tempo} min — {plan.semana1.finalizacao.intensidade}</p>
                          <p className="text-blue-300" style={{color: colors.blue}}>{plan.semana1.finalizacao.observacoes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 4. Recomendações */}
                  <div className="rounded-lg border border-purple-500/30 p-4 bg-black/30">
                    <h3 className="text-[#874bff] font-semibold mb-2">4. Recomendações Personalizadas</h3>
                    <ul className="list-disc list-inside text-gray-200">
                      {plan.recomendacoes.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>

                  {/* 5. Progresso 4 semanas */}
                  <div className="rounded-lg border border-purple-500/30 p-4 bg-black/30">
                    <h3 className="text-[#874bff] font-semibold mb-2">5. Progresso nas Próximas 4 Semanas</h3>
                    <ul className="list-disc list-inside text-gray-200">
                      {plan.progresso.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>

                  {/* 6. Avisos Importantes */}
                  <div className="rounded-lg border border-purple-500/30 p-4 bg-black/30">
                    <h3 className="text-[#874bff] font-semibold mb-2">6. Avisos Importantes</h3>
                    <ul className="list-disc list-inside text-gray-200">
                      {plan.avisos.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </Section>
          </div>
        </div>

        <footer className="mt-10 text-xs text-gray-400">Voz do agente: direta, clara e sem firulas. Sempre personalizado. Sem emojis.</footer>
      </div>
    </div>
  )
}
