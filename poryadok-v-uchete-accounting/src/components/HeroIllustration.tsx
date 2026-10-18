import {
  ArrowUpRight,
  Check,
  CheckCheck,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
export default function HeroIllustration() {
  return (
    <figure className="hero-illustration">
      <div className="art-grid" aria-hidden="true" />
      <div className="overview-card">
        <div className="overview-header">
          <span className="overview-logo">
            <FileCheck2 size={20} />
          </span>
          <span>
            Ваш бизнес<strong>Всё идёт по плану</strong>
          </span>
          <span className="overview-dot" />
        </div>
        <div className="overview-main">
          <div className="overview-label">
            <span>УЧЁТ ПОД КОНТРОЛЕМ</span>
            <ArrowUpRight size={17} />
          </div>
          <h3>
            Больше ясности.
            <br />
            Меньше забот.
          </h3>
          <div className="overview-chart" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="overview-checks">
            <div>
              <span>
                <FileCheck2 size={16} /> Отчётность
              </span>
              <strong>
                <Check size={13} /> Подготовлена
              </strong>
            </div>
            <div>
              <span>
                <ShieldCheck size={16} /> Налоги
              </span>
              <strong>
                <Check size={13} /> Рассчитаны
              </strong>
            </div>
            <div>
              <span>
                <CheckCheck size={16} /> Документы
              </span>
              <strong>
                <Check size={13} /> Проверены
              </strong>
            </div>
          </div>
        </div>
      </div>
      <div className="accountant-message">
        <span className="accountant-avatar">АМ</span>
        <div>
          <strong>Анна, ваш бухгалтер</strong>
          <p>
            Документы проверила.
            <br />К отчётности готовы.
          </p>
          <span>
            На связи, если появятся вопросы <CheckCheck size={13} />
          </span>
        </div>
      </div>
      <div className="deadline-badge">
        <span>
          <Check size={18} />
        </span>
        <div>
          <strong>Всё вовремя</strong>
          <small>Без напоминаний с вашей стороны</small>
        </div>
      </div>
      <figcaption>Иллюстрация сопровождения · данные вымышлены</figcaption>
    </figure>
  );
}
