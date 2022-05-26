<?php get_header(); ?>
<?php // echo '<pre>' ?> 
<?php // var_dump($wp_query); ?>
<?php // echo '</pre>' ?> 
<?php if(have_posts()) { ?>
  <?php while(have_posts()) { ?>
    <?php the_post(); ?>
    <h2>
      <a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>"><?php the_title( ); ?></a>
    </h2>
    <div>
      <?php imontheme_post_meta() ?>
    </div>
    <div>
      <?php the_excerpt(); ?>
    </div>
      <?php imontheme_readmore_link(); ?>
    <?php } ?>
    <?php the_posts_pagination(); ?>
<?php } else { ?>
  <p>Sorry, no posts matched your criteria.</p>
<?php }?>
<?php get_footer(); ?>