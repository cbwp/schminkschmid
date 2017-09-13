<?php 
defined('C5_EXECUTE') or die("Access Denied.");
$this->inc('elements/header.php'); 
?>
	<section class="cnt">
		<?php 
			$a = new Area('Inhalt');
			$a->display($c);
		?>
	</section>

<?php $this->inc('elements/footer.php'); ?>