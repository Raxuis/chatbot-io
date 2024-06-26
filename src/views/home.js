import homeBotList from './homeBotList';

export default (entities) => `
    <section class="row chat animation-chat">
      <div class="col-3 left-side">
        <h2 class="text-light">Bots.</h2>
        <ul class="list-group gap-3 pt-3 col-11">
        ${entities.map((bot) => homeBotList(bot.entity))
    .join('')}
        </ul>
      </div>
      
      <div class="col-9 right-side">
        <div class="messages-section">
                <div class="load-more">
                        <a class="btn btn-primary" id="loadMoreButton">Load more...</a>
                </div>
        </div>
      
        <div class="messages">
        <div class="autocomplete">
                <ul class="autocomplete-items"></ul>
        </div>
          <div class="input-group">
              <input type="text" class="form-control message-input" spellcheck="false" placeholder="Type something..." aria-label="Type something..."
                     aria-describedby="button-addon2" name="message" autofocus autocomplete="off">
              <button class="btn btn-dark send-message" type="button" id="button-addon2"><i class="fa-solid fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
    </div>
  </section>`;
