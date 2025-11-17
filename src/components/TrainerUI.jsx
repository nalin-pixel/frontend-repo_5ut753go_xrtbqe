import { useState } from 'react'

const colors = {
  bg: 'bg-black',
  card: 'bg-[#0b0b0f]/80',
  purple: '#874bff',
  turquoise: '#2ce3c2',
  blue: '#4ea4ff'
}

function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-purple-500/20 p-5 md:p-6 bg-gradient-to-b from-white/5 to-transparent">
      <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-3">
        <span className="text-white">{title}</span>
      </h2>
      <div className="text-gray-200 leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  )
}

export default function TrainerUI() {
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)

  async function handleGenerate(e) {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const questionnaire = {
      objetivo: form.get('objetivo'),
      nivel: form.get('nivel'),
      idade: form.get('idade') ? Number(form.get('idade')) : null,
      sexo: form.get('sexo') || null,
      peso_kg: form.get('peso') ? Number(form.get('peso')) : null,
      altura_cm: form.get('altura') ? Number(form.get('altura')) : null,
      lesoes: (form.get('lesoes') || '').split(',').map(s => s.trim()).filter(Boolean),
      dores: (form.get('dores') || '').split(',').map(s => s.trim()).filter(Boolean),
      tempo_por_sessao_min: Number(form.get('tempo')),
      sessoes_semana: Number(form.get('frequencia')),
      rotina: form.get('rotina') || null,
      estilo_preferido: form.get('estilo') || null,
      equipamentos: (form.get('equipamentos') || '').split(',').map(s => s.trim()).filter(Boolean),
      cardio_preferido: form.get('cardio') || 'caminhada',
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
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight"><span className="text-white">Personal Trainer Premium</span><span className="ml-2 text-[#874bff]">.blue</span></h1>
          <p className="text-gray-300 mt-2">Direto, claro e sob medida. Você responde, eu entrego um plano de treino de alto nível — pronto para executar.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Formulário */}
          <form onSubmit={handleGenerate} className="space-y-4 md:space-y-5">
            <Section title="Questionário Rápido">
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
                  <select name="nivel" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2ce3c2]" required>
                    <option value="iniciante">Iniciante</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="avancado">Avançado</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Tempo por sessão (min)</label>
                  <input type="number" name="tempo" min="15" max="120" defaultValue={45} className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2 focus:outline-none" required />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Sessões/semana</label>
                  <input type="number" name="frequencia" min="2" max="7" defaultValue={4} className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2 focus:outline-none" required />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Estilo preferido</label>
                  <select name="estilo" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2 focus:outline-none">
                    <option value="">Sem preferência</option>
                    <option value="full body">Full body</option>
                    <option value="abc">ABC</option>
                    <option value="upper/lower">Upper/Lower</option>
                    <option value="circuito">Circuito</option>
                    <option value="funcional">Funcional</option>
                    <option value="maquinas">Máquinas</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Cardio preferido</label>
                  <select name="cardio" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2 focus:outline-none">
                    <option value="caminhada">Caminhada</option>
                    <option value="esteira">Esteira</option>
                    <option value="bike">Bike</option>
                    <option value="eliptico">Elíptico</option>
                    <option value="pular corda">Pular corda</option>
                    <option value="nenhum">Nenhum</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Equipamentos (separados por vírgula)</label>
                  <input name="equipamentos" placeholder="halteres, banco, elástico, máquina de remada" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2 focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Lesões</label>
                  <input name="lesoes" placeholder="joelho, ombro..." className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Dores</label>
                  <input name="dores" placeholder="lombar, cervical..." className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Idade</label>
                  <input type="number" name="idade" min="10" max="100" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Sexo</label>
                  <select name="sexo" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2">
                    <option value="">Prefiro não dizer</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Peso (kg)</label>
                  <input type="number" step="0.1" name="peso" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Altura (cm)</label>
                  <input type="number" name="altura" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Rotina / horários</label>
                  <input name="rotina" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Histórico</label>
                  <input name="historico" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Personalidade de treino</label>
                  <input name="personalidade" className="w-full mt-1 bg-black/40 border border-purple-500/30 rounded px-3 py-2" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-300">Restrições / observações</label>
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
                <p className="text-gray-400">Preencha o questionário ao lado. Eu vou interpretar tudo e entregar um plano claro, direto e pronto para aplicar.</p>
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
